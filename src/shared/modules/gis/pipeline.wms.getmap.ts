import { Map as AppMap } from 'maplibre-gl';
import { ImageExtent, WMSRequest } from 'shared/constants/types/types';
import { GeoserverWMSRequestURL, PipelineLayerIdsInGeoserver } from 'shared/constants/varibales';
import { getExtentCoordinatesFromBounds, getMapRequestParams } from 'shared/modules/map.utils';

export function getMapByWMS(map: AppMap) {
  PipelineLayerIdsInGeoserver.forEach((id) => getMap(id));
  function getMap(layerId: string) {
    const bounds = map.getBounds();
    const imageExtent: ImageExtent = getExtentCoordinatesFromBounds(bounds);
    const wmsBbox = `${imageExtent[0][0]},${imageExtent[3][1]},${imageExtent[1][0]},${imageExtent[0][1]}`;
    const { clientWidth, clientHeight } = map.getContainer();
    const obj: WMSRequest = {
      LAYERS: layerId,
      WIDTH: clientWidth,
      HEIGHT: clientHeight,
      BBOX: wmsBbox,
      TILED:true,
    };

    const params = getMapRequestParams(obj);
    const searchParams: URLSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => searchParams.append(key, value));
    // const queryString = `?${searchParams.toString()}`;
    // const wmsReq = `${GeoserverWMSRequestURL}${queryString}`;
    // map.addSource(layerId, { type: 'image', url: wmsReq, coordinates: imageExtent });
    // map.addLayer({ id: `wms-test-layer_${layerId}`, type: 'raster', source: layerId });
    if(map.getLayer(`wms-test-layer_${layerId}`)){
      return;
    }
    map.addLayer({
      id: `wms-test-layer_${layerId}`,
      type: 'raster',
      source: {
        type: 'raster',
        tiles: [
          // wmsReq
          `${GeoserverWMSRequestURL}?service=WMS&version=1.3.0&request=GetMap&layers=${layerId}&format=image/png&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&transparent=true`
        ],
        tileSize: 256
      },
      paint: {}
    });
  }
}
