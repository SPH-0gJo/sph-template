import { Map as AppMap } from 'maplibre-gl';
import { GEOLAB_VECTOR_TILE_STYLE } from 'shared/constants/varibales';
const circleSize = 1;
const pointUnitValue = 100;
const sourceLayerFromVectortile = 'Songdo_asc_step7_mv';
export function addMassivePoints(map: AppMap, count: number) {
  if (!map || !map.getStyle()) return;
  const source = map.getSource(sourceName);
  if (!source) map.addSource(sourceName, { type: 'vector', url: GEOLAB_VECTOR_TILE_STYLE });
  const length = count / pointUnitValue;
  const arr = Array.from({ length }, (_, i) => i);
  console.time('Add Massive Points');
  const added = arr.map(async (id) => await addLayers(id));
  Promise.all(added).then(() => {
    console.timeEnd('Add Massive Points');
    console.log(map.getStyle().layers);
  });
  function addLayers(id: number) {
    return new Promise((resolve) => {
      map.addLayer({
        id: `${layerPrefix}_${id}`,
        type: 'circle',
        source: sourceName,
        'source-layer': sourceLayerFromVectortile,
        paint: { 'circle-color': '#119229', 'circle-radius': circleSize },
      });
      resolve({ success: true });
    });
  }
}
export const layerPrefix = 'massive_points_sample';

export function removeMassivePoints(map: AppMap) {
  const source = map.getSource(sourceName);
  if (!source) return;
  // const layers = Array.from({ length: 1000 }, (_, i) => `${layerPrefix}_${i}`);
  // layers.forEach((id) => map.removeLayer(id));
  for (let i = 0; i < 1000; i++) {
    const layerId = `${layerPrefix}_${i}`;
    const layer = map.getLayer(layerId) || undefined;
    if (!layer) {
      map.removeSource(sourceName);
      return;
    }
    map.removeLayer(layerId);
  }
}

export const sourceName = 'massive-points-layers';
