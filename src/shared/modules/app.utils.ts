export const numberFormatterForUS = (n: number) =>
  n.toLocaleString('en-US', { maximumFractionDigits: 2, notation: 'compact', compactDisplay: 'short' });
