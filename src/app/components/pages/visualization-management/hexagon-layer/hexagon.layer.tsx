import { AmbientLight, LightingEffect, PointLight } from '@deck.gl/core/typed';
import { HexagonLayer } from 'deck.gl/typed';

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

export const lightingEffect = new LightingEffect({ ambientLight, pointLight1, pointLight2 });

export const hexagonColorRange: Array<[number, number, number]> = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

export function addHexagonLayer(data: number[][], coverage: number, radius: number, upper: number) {
  return new HexagonLayer({
    id: 'heatmap',
    colorRange: hexagonColorRange,
    data,
    coverage,
    radius,
    upperPercentile: upper,
    elevationRange: [0, 3000],
    elevationScale: data && data.length ? 50 : 0,
    extruded: true,
    getPosition: (d) => d,
    pickable: true,
    material: {
      ambient: 0.64,
      diffuse: 0.6,
      shininess: 32,
      specularColor: [51, 51, 51],
    },
    transitions: {
      elevationScale: 3000,
    },
  });
}
