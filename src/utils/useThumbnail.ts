import { IOptions } from '../common/types';
import { setPropertyStyles, isTouchEvent, toTime } from '../common/helpers';
import { getThumbnailImage, getAxis, getAxisThumb } from './getThumbValues';
import { defaultScale } from '../common/constance';

export default function useThumbnail(video: HTMLVideoElement, options: IOptions) {
  const seekBar: HTMLElement | null = document.querySelector(options.seekBarId ?? '.shaka-seek-bar');
  const control: HTMLElement | null = document.querySelector(options.seekBarId ?? '.shaka-bottom-controls');
  const thumbnails = options.thumbnails;
  const thumbnailWrapper = document.getElementById('thumbnail');

  const create = async (e: MouseEvent | TouchEvent): Promise<void> => {
    if (seekBar instanceof HTMLElement) {
      const sb: HTMLElement = seekBar;
      const seekbarOffset: number = (video.offsetWidth - sb.offsetWidth) / 2;
      const sbRect = sb.getBoundingClientRect();
      const seekBarLeft = sbRect.left;
      const seekBarWidth = sbRect.width;

      const clientX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
      const relativeX = Math.max(0, Math.min(seekBarWidth, clientX - seekBarLeft));

      const clientPercent = relativeX / seekBarWidth;
      const currentTime = video.duration * clientPercent;

      const interval =
        options.interval ?? Math.ceil(video.duration / (thumbnails.length * options.columns * options.rows));
      const imageInSpriteIndex = Math.floor(currentTime / interval);

      const thumbIndex = Math.trunc(imageInSpriteIndex / (options.columns * options.rows));
      const thumbValue = thumbnails[thumbIndex];

      const scaleImage = options?.scale ?? defaultScale;
      const spriteWidth = interval * options.columns * options.rows;
      const spriteEvent = Math.floor(currentTime % spriteWidth);

      if (thumbValue && thumbIndex !== null) {
        const thumbnail = getThumbnailImage(thumbIndex, thumbValue);

        if (thumbnail && thumbnailWrapper && control) {
          const thumbWidth = (thumbnail.naturalWidth / options?.columns) * scaleImage;
          const thumbHeight = (thumbnail.naturalHeight / options?.rows) * scaleImage;
          const thumbFullWidth = thumbnail.naturalWidth * scaleImage;
          const thumbFullHeight = thumbnail.naturalHeight * scaleImage;

          const { x, y } = getAxis(spriteEvent, interval, options);
          const { top, left } = getAxisThumb(clientX, thumbWidth, seekBarWidth, seekbarOffset, control, options);

          setPropertyStyles(thumbnailWrapper, {
            display: 'flex',
            width: thumbWidth + 'px',
            height: thumbHeight + 'px',
            backgroundColor: 'black',
            backgroundImage: `url(${thumbnail.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `${-y * thumbWidth}px ${-x * thumbHeight}px`,
            backgroundSize: `${thumbFullWidth}px ${thumbFullHeight}px`,
            top: top + 'px',
            left: left + 'px',
            color: 'hsla(0,0%,100%,0.9)',
            textShadow: '0 0 0.4rem rgba(0,0,0,0.4)',
            borderRadius: '3px',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            margin: '0 1px',
            zIndex: 1000,
            justifyContent: 'center',
            alignItems: 'flex-end',
            ...(options?.styles || {}),
          });
          thumbnailWrapper.setAttribute('data-time', toTime(currentTime));
        }
      }
    }
  };
  const remove = (): void => {
    if (thumbnailWrapper) {
      setPropertyStyles(thumbnailWrapper, {
        display: 'none',
      });
    }
  };
  return { create, remove };
}
