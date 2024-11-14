import { IOptions } from './common/types';
import useThumbnails from './utils/useThumbnail';
import { createImagesPool, createThumbnailContainer, createTimeTooltip } from './utils/generateElements';

export default class ThumbnailsPlugin {
  private readonly options: IOptions;
  public video: HTMLVideoElement;

  constructor(video: HTMLVideoElement, options: IOptions) {
    this.video = video;
    this.options = options;
  }

  async initialize(): Promise<void> {
    let seekBar: HTMLElement | null;
    if (this.options.seekBarId) {
      seekBar = document.querySelector(this.options.seekBarId);
    } else {
      seekBar = document.querySelector('.shaka-seek-bar');
    }

    if (this.video && seekBar) {
      createThumbnailContainer(this.video);
      createTimeTooltip(this.options?.timeTooltip);
      await createImagesPool(this.options.thumbnails);
      const imagePool = new Map(this.options.thumbnails.map((image, index) => [index + 1, image]));
      const { create, remove } = useThumbnails(this.video, this.options, imagePool);

      if (seekBar instanceof HTMLElement) {
        seekBar.addEventListener('mousemove', create);
        seekBar.addEventListener('mouseleave', remove);
        seekBar.addEventListener('touchmove', create);
        seekBar.addEventListener('touchend', remove);
        seekBar.addEventListener('touchcancel', remove);
      }
    }
  }
}
