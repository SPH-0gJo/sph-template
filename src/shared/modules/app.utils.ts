export const bytesToSize = (bytes: number | string) => {
  let b: string;
  if (typeof bytes !== 'number') b = bytes.replace(/[^0-9]/g, '');
  else b = String(bytes);
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  let i = 0,
    n = parseInt(b, 10) || 0;
  while (n >= 1024 && ++i) n = n / 1024;
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
};

export const importExternalScript = (src: string, callback: () => void) => {
  const element = document.createElement('script');
  element.type = 'text/javascript';
  element.src = src;
  if (callback) element.onload = () => callback();
  document.head.appendChild(element);
};

export const makeRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};

export const numberFormatterForUS = (n: number) =>
  n.toLocaleString('en-US', { maximumFractionDigits: 2, notation: 'compact', compactDisplay: 'short' });
