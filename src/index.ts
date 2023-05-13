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
    const seekBar: HTMLElement | null = document.querySelector('.shaka-seek-bar');
    if (this.video && seekBar) {
      await createThumbnailContainer(this.video);
      await createTimeTooltip(this.options?.timeTooltip);
      await createImagesPool(this.options.thumbnails);

      const { create, remove } = useThumbnails(this.video, this.options);

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
