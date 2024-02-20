import { ScreenGridLayer } from '@deck.gl/aggregation-layers/typed';

const colorRange: Array<[number, number, number, number]> = [
  [255, 255, 178, 25],
  [254, 217, 118, 85],
  [254, 178, 76, 127],
  [253, 141, 60, 170],
  [240, 59, 32, 212],
  [189, 0, 38, 255],
];

export function addScreenGridLayer(
  data: Array<[number, number, number]>,
  cellSize: number = 20,
  gpuAggregation: boolean = true,
) {
  return new ScreenGridLayer({
    id: 'grid',
    data,
    opacity: 0.8,
    getPosition: (d) => [d[0], d[1]],
    getWeight: (d) => d[2],
    cellSizePixels: cellSize,
    colorRange,
    gpuAggregation,
    aggregation: 'SUM',
  });
}
