import { Map as AppMap } from 'maplibre-gl';

export function getScale(map: AppMap, maxWidth = 100) {
  const y = map.getContainer().getBoundingClientRect().height / 2;
  const left = map.unproject([0, y]);
  const right = map.unproject([maxWidth, y]);
  const maxMeters = left.distanceTo(right);

  return calculateScale(maxMeters, 'meters');
}

function calculateScale(maxDistance: number, unit: string) {
  return {
    maxDistance,
    unit,
  };
}
