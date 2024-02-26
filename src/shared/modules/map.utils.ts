import maplibregl, { LngLatBounds } from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { ImageExtent, WMSRequest } from 'shared/constants/types/types';
import { initCoords } from 'shared/constants/varibales';

export function getExtentCoordinatesFromBounds(bounds: LngLatBounds): ImageExtent {
  return [
    bounds.getNorthWest().toArray(),
    bounds.getNorthEast().toArray(),
    bounds.getSouthEast().toArray(),
    bounds.getSouthWest().toArray(),
  ];
}

export const getMapRequestParams = (params: WMSRequest) => {
  // const { WIDTH, HEIGHT, LAYERS, BBOX } = params;
  const payload: WMSRequest = {
    SERVICE: 'WMS',
    VERSION: '1.1.0',
    REQUEST: 'GetMap',
    FORMAT: 'image/png',
    TRANSPARENT: 'true',
    SRS: 'EPSG:4326',
    CRS: 'EPSG:4326',
  };
  return Object.assign(payload, params);
};

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
