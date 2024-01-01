import maplibregl from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { initCoords } from 'shared/constants/varibales';
export const initMap = (container: HTMLDivElement | string, zoom: number) => {
  console.log('initMap');
  const [lng, lat] = initCoords;
  return new maplibregl.Map({
    container,
    hash: true,
    style: vectorTileBaseMaps[0].style,
    center: [lng, lat],
    zoom,
  });
};
