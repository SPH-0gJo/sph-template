export const numberFormatterForUS = (n: number) =>
  n.toLocaleString('en-US', { maximumFractionDigits: 2, notation: 'compact', compactDisplay: 'short' });

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
