const {
  VITE_GEOLAB_VECTOR_TILE_STYLE,
  VITE_GEOSERVER_WMS_REQUEST_URL,
  VITE_NO_IMAGE,
  VITE_OPEN_API_KEY,
  VITE_VWORLD_KEY,
} = import.meta.env;
export const CircleSize = 3;
export const GeolabVectorTileStyle = VITE_GEOLAB_VECTOR_TILE_STYLE;
export const GeoserverWMSRequestURL = VITE_GEOSERVER_WMS_REQUEST_URL;
export const initCoords = [127.0535312, 37.2893525];
export const NoImage = VITE_NO_IMAGE;
export const OpenAPIKey = VITE_OPEN_API_KEY;
export const PipelineLayerIdsInGeoserver = [
  'geolab:GSF_PL_MT',
  'geolab:GSF_VV_MT',
  'geolab:GSF_TB_MT',
  'geolab:GSF_RGLT_MT',
];
export const vWorldKey = VITE_VWORLD_KEY;
