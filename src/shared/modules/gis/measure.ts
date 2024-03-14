import { useMapMeasureStore } from 'app/stores/mapMeasure';
import { Map as AppMap } from 'maplibre-gl';
import {
  addAreaLayers,
  measureAreaAction,
  measureAreaDeAction,
  removeAreaLayers,
} from 'shared/modules/gis/measure.area';

// import { measureDistanceAction, removeDistanceLayers } from 'shared/modules/gis/measure.distance';

export function measureControl(map: AppMap) {
  const measureType = useMapMeasureStore.getState().measureType;
  const areaSource = useMapMeasureStore.getState().areaSource;
  const areaValue = useMapMeasureStore.getState().areaValue;

  const style = map.getCanvas().style;
  style.cursor = measureType !== 'none' ? 'crosshair' : 'default';

  // removeDistanceLayers(map);/**/
  // addDistanceLayers(map, distanceSource, measureType);

  removeAreaLayers(map);
  addAreaLayers(map, areaSource, measureType);
  //
  // measureType === 'distance' && map.on('click', measureDistanceAction);
  // measureType !== 'distance' && map.off('click', measureDistanceAction);

  measureType === 'area' && areaValue === 0 && map.on('click', measureAreaAction);
  measureType === 'area' &&
    areaValue === 0 &&
    map.on('contextmenu', (e) => {
      measureAreaDeAction(e);
      map.off('click', measureAreaAction);
      map.getCanvas().style.cursor = 'default';
      map.setLayoutProperty('area-points', 'visibility', 'none');
    });
  measureType !== 'area' && map.off('click', measureAreaAction);
  measureType !== 'area' && map.off('contextmenu', measureAreaDeAction);
}
