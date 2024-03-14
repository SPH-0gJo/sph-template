const {
  VITE_GEOLAB_VECTOR_TILE_STYLE,
  VITE_GEOSERVER_WMS_REQUEST_URL,
  VITE_NO_IMAGE,
  VITE_OPEN_API_KEY,
  VITE_VWORLD_KEY,
  VITE_NAVER_CLIENT_ID,
} = import.meta.env;
export const CircleSize = 5;
export const GEOLAB_VECTOR_TILE_STYLE = VITE_GEOLAB_VECTOR_TILE_STYLE;
export const GeoserverWMSRequestURL = VITE_GEOSERVER_WMS_REQUEST_URL;
export const initCoords = [127.0535312, 37.2893525];
export const NAVER_MAP_API_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${VITE_NAVER_CLIENT_ID}&submodules=panorama`;
export const NoImage = VITE_NO_IMAGE;
export const OpenAPIKey = VITE_OPEN_API_KEY;
export const PipelineLayerIdsInGeoserver = [
  'geolab:GSF_PL_MT',
  'geolab:GSF_VV_MT',
  'geolab:GSF_TB_MT',
  'geolab:GSF_RGLT_MT',
];
export const VALVE_CLASS_TYPES: { [index: string]: string } = {
  '2310': 'HP 본관밸브',
  '2311': 'HP 공급관밸브',
  '2312': 'HP 사용자공급관밸브',
  '2313': 'HP 내관밸브',
  '2320': 'MA 본관밸브',
  '2321': 'MA 공급관밸브',
  '2322': 'MA 사용자공급관밸브',
  '2323': 'MA 내관밸브',
  '2330': 'LP 본관밸브',
  '2331': 'LP 공급관밸브',
  '2332': 'LP 사용자공급관밸브',
  '2333': 'LP 내관밸브',
  'default-key': 'N/A',
};
export const vWorldKey = VITE_VWORLD_KEY;
