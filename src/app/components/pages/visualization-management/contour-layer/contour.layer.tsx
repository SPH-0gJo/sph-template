import { ContourLayer } from 'deck.gl/typed';

export const contoursColorBands: Array<{ threshold: [number, number]; color: [number, number, number] }> = [
  { threshold: [0.1, 1], color: [255, 255, 178] },
  { threshold: [1, 10], color: [254, 204, 92] },
  { threshold: [10, 100], color: [253, 141, 60] },
  { threshold: [100, 500], color: [240, 59, 32] },
  { threshold: [500, 2000], color: [189, 0, 38] },
  { threshold: [2000, 10000], color: [159, 0, 80] },
];

export function addContourLayer(cellSize: number, week: number) {
  const data = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/contour/covid-by-county.json';

  return new ContourLayer({
    data,
    id: 'contour-layer',
    contours: contoursColorBands,
    cellSize,
    getPosition: (d) => [d.longitude, d.latitude],
    getWeight: (d) => ((d.casesByWeek[week] || 0) / d.population) * 1e5,
    updateTriggers: {
      getWeight: week,
    },
    pickable: true,
    aggregation: 'MAX',
  });
}
