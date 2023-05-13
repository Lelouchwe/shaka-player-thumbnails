import { IOptions } from '../common/types';
import { setPropertyStyles, isTouchEvent, toTime } from '../common/helpers';
import { getThumbnailImage, getAxis, getAxisThumb } from './getThumbValues';
import { defaultScale } from '../common/constance';

export default function useThumbnail(video: HTMLVideoElement, options: IOptions) {
  const seekBar: HTMLElement | null = document.querySelector('.shaka-seek-bar');
  const control: HTMLElement | null = document.querySelector('.shaka-bottom-controls');
  const thumbnails = options.thumbnails;
  const thumbnailWrapper = document.getElementById('thumbnail');

  const create = async (e: MouseEvent | TouchEvent): Promise<void> => {
    if (seekBar instanceof HTMLElement) {
      const sb: HTMLElement = seekBar;
      const seekbarOffset: number = (video.offsetWidth - sb.offsetWidth) / 2;
      const clientX: number = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;

      const seekBarWidth: number = sb.clientWidth;
      const spriteWidth: number = (seekBarWidth + seekbarOffset) / thumbnails.length;
      const thumbCountPerSlide: number = options?.columns * options?.rows;
      const stepThumbInSprite: number = spriteWidth / thumbCountPerSlide;
      const thumbIndex: number = Math.floor((clientX - seekbarOffset) / spriteWidth);
      const spriteEvent: number = clientX - seekbarOffset - spriteWidth * thumbIndex;
      const scaleImage: number = options?.scale ?? defaultScale;
      const clientPercent: number = 1 - (1 - (clientX - seekbarOffset) / seekBarWidth);
      const currentTime: number = video.duration * clientPercent;

      const thumbValue = thumbnails[thumbIndex];

      if (thumbValue && thumbIndex !== null) {
        const thumbnail = await getThumbnailImage(thumbIndex);

        if (thumbnail && thumbnailWrapper && control) {
          const thumbWidth = (thumbnail.naturalWidth / options?.columns) * scaleImage;
          const thumbHeight = (thumbnail.naturalHeight / options?.rows) * scaleImage;
          const thumbFullWidth = thumbnail.naturalWidth * scaleImage;
          const thumbFullHeight = thumbnail.naturalHeight * scaleImage;

          const { x, y } = getAxis(spriteEvent, stepThumbInSprite, options);
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
