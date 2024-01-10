import maplibregl from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { initCoords } from 'shared/constants/varibales';
export const initMap = (container: HTMLDivElement | string, zoom: number, styleIdx: number) => {
  console.log('initMap');
  const [lng, lat] = initCoords;
  const style = styleIdx ? vectorTileBaseMaps[styleIdx].style : vectorTileBaseMaps[0].style;
  return new maplibregl.Map({
    container,
    hash: true,
    style,
    center: [lng, lat],
    zoom,
  });
};
