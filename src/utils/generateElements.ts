import { defaultTooltipOffset } from '../common/constance';
import { setPropertyStyles } from '../common/helpers';

const thumbnail: HTMLElement = document.createElement('div');

export const createThumbnailContainer = (video: HTMLElement) => {
  thumbnail.id = 'thumbnail';
  thumbnail.className = 'shaka-thumbnail';
  setPropertyStyles(thumbnail, {
    position: 'absolute',
    display: 'none',
  });
  if (video.parentNode) {
    video.parentNode.appendChild(thumbnail);
  } else {
    const parent = document.body;
    parent.appendChild(thumbnail);
  }
};
export const createImagesPool = async (images: string[]) => {
  for await (const [index, value] of images.entries()) {
    const image: HTMLImageElement = document.createElement('img');
    image.id = 'thumbnail-' + index;
    image.src = value;
    setPropertyStyles(image, {
      display: 'none',
    });
    image.onload = () => thumbnail.appendChild(image);
  }
};

export const createTimeTooltip = (tooltip: Boolean | undefined) => {
  if (tooltip === false) return;
  const style = document.createElement('style');
  style.innerHTML = `.${thumbnail.className}::before { content: attr(data-time); position: absolute; bottom: -${defaultTooltipOffset}px; }`;
  document.head.appendChild(style);
};
