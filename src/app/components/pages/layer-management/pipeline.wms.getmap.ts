import { Map as AppMap } from 'maplibre-gl';
interface WMSRequest {
  SERVICE?: string;
  VERSION?: string;
  REQUEST?: 'GetMap' | 'GetFeatureInfo';
  FORMAT?: string;
  TRANSPARENT?: string;
  LAYERS?: string;
  SRS?: string;
  CRS?: string;
  WIDTH?: number;
  HEIGHT?: number;
  BBOX?: string;
  TILED?: boolean;
}

export function getMapByWMS(map: AppMap) {
  const layerIds = ['geolab:GSF_VV_MT', 'geolab:GSF_TB_MT', 'geolab:GSF_RGLT_MT', 'geolab:GSF_PL_MT'];
  layerIds.forEach((id) => getMap(id));
  function getMap(layerId: string) {
    // const bounds = map.getBounds();
    // const bbox: number[][] = getExtentCoordinatesFromBounds(bounds);
    // const wmsBbox = `${bbox[0][0]},${bbox[3][1]},${bbox[1][0]},${bbox[0][1]}`;
    const obj: WMSRequest = {
      SERVICE: 'WMS',
      VERSION: '1.3.0',
      REQUEST: 'GetMap',
      FORMAT: 'image/png',
      TRANSPARENT: 'true',
      LAYERS: layerId,
      SRS: 'EPSG:3857',
      CRS: 'EPSG:3857',
      WIDTH: 256,
      HEIGHT: 256,
      TILED: true,
    };
    const searchParams: URLSearchParams = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => searchParams.append(key, value));
    const queryString = `?${searchParams.toString()}`;
    const wmsReq = `http://localhost:8080/geoserver/geolab/wms${queryString}&bbox={bbox-epsg-4326}`;
    console.log(wmsReq);
    // map.addSource(layerId, {
    //   type: 'raster',
    //   tiles: [wmsReq],
    //   tileSize: 256,
    // });
    // map.addLayer({
    //   id: `wms-test-layer_${layerId}`,
    //   type: 'raster',
    //   source: layerId,
    //   paint: {},
    // });
  }
}

function getExtentCoordinatesFromBounds(bounds) {
  return [
    bounds.getNorthWest().toArray(),
    bounds.getNorthEast().toArray(),
    bounds.getSouthEast().toArray(),
    bounds.getSouthWest().toArray(),
  ];
}
