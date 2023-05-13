import { IOptions } from '../common/types';
import { defaultTop } from '../common/constance';

export const getThumbnailImage = (index: number): HTMLImageElement | null =>
  document.getElementById('thumbnail-' + index) as HTMLImageElement;

export const getAxis = (position: number, step: number, options: IOptions): { x: number; y: number } => {
  const x = Math.floor((position / step / options?.columns) % options?.rows);
  const y = Math.floor((position / step) % options?.columns);
  return { x, y };
};

export const getAxisThumb = (
  position: number,
  imageWidth: number,
  seekBarWidth: number,
  offset: number,
  control: HTMLElement,
  options: IOptions,
): { top: number; left: number } => {
  const top = control.offsetTop - (options?.top ?? defaultTop);
  const left = Math.min(Math.max(position - imageWidth / 2, offset), seekBarWidth - imageWidth + offset);
  return { top, left };
};
