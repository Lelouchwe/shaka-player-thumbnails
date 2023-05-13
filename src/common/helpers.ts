export const camelToKebabCase = (str: string): string => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

export const isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent =>
  window.TouchEvent && e instanceof TouchEvent;

export const setPropertyStyles = (el: HTMLElement, options: Object) => {
  Object.entries(options).forEach(([k, v]) =>
    v !== '' ? el.style.setProperty(camelToKebabCase(k), v) : el.style.removeProperty(camelToKebabCase(k)),
  );
};

export const divTime = (divider: number[], ms: number): number[] => {
  let save = ms;
  return divider.map(div => {
    const times = Math.floor(save / div);
    save = save % div;
    return times;
  });
};

export const toFormatTime = (seconds: number): string => {
  const ms = seconds * 1000;
  const times = divTime([36e5, 6e4, 1e3], ms);
  return times
    .map(time => time.toString().padStart(2, '0'))
    .join(':')
    .replace(/00:/, '');
};

export const toTime = (seconds: number): string => {
  const ms = seconds * 1000;
  return new Date(ms).toISOString().substring(11, 19).replace(/00:/, '');
};
