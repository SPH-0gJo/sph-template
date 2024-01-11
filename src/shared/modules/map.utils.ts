import maplibregl from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { initCoords } from 'shared/constants/varibales';
export const initMap = (
  container: HTMLDivElement | string,
  zoom: number,
  styleIdx: number,
  $center: number[] | undefined,
) => {
  console.log('initMap');
  const style = styleIdx ? vectorTileBaseMaps[styleIdx].style : vectorTileBaseMaps[0].style;
  const [lng, lat] = $center ? $center : initCoords;
  return new maplibregl.Map({
    container,
    hash: true,
    style,
    center: [lng, lat],
    zoom,
  });
};
