import { Map as AppMap } from 'maplibre-gl';

const styleUrl = 'http://34.64.161.119:8081/data/pipeline_samplesv2.json';
const circleSize = 1;
const pointUnitValue = 100;
const sourceLayerFromVectortile = 'Songdo_asc_step7_mv';
export const sourceName = 'massive-points-layers';
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

export function addMassivePoints(map: AppMap, count: number) {
  if (!map || !map.getStyle()) return;
  const source = map.getSource(sourceName);
  if (!source) map.addSource(sourceName, { type: 'vector', url: styleUrl });
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
