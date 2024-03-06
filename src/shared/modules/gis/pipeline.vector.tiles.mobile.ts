import { Map as AppMap } from 'maplibre-gl';
import { CircleSize, GEOLAB_VECTOR_TILE_STYLE } from 'shared/constants/varibales';
import { pipelines, rglt, tbs, valves } from 'shared/fixtures/pipeline';

export function addVectorTilesMobile(map: AppMap) {
  if (!map || !map.getStyle()) return;
  const source = map.getSource('geolab-layers');
  if (source) return;
  map.addSource('geolab-layers', { type: 'vector', url: GEOLAB_VECTOR_TILE_STYLE });
  pipelines.forEach((e) => {
    const { code, color, width, lineStyle } = e;
    const paint: { 'line-color': string; 'line-width': number; 'line-dasharray'?: Array<number> } = {
      'line-color': color,
      'line-width': width,
    };
    if (lineStyle === 'dashed') paint['line-dasharray'] = [2.5, 2.5];
    map.addLayer({
      id: `gsf_pl_mt_${code}`,
      type: 'line',
      source: 'geolab-layers',
      'source-layer': 'gsf_pl_mt',
      layout: { 'line-join': 'round', 'line-cap': 'round', visibility: 'none' },
      paint,
      filter: ['==', 'GIS_PL_TY_', code],
    });
  });

  valves.forEach((e) => {
    const { code, color } = e;
    map.addLayer({
      id: `gsf_vv_mt_${code}`,
      type: 'circle',
      source: 'geolab-layers',
      'source-layer': 'gsf_vv_mt',
      // minzoom: 13,
      // layout: { 'icon-image': 'shop-icon', 'icon-size': 0.4 },
      paint: { 'circle-color': color, 'circle-radius': CircleSize },
      filter: ['==', 'GIS_VV_TYP', code],
      layout: { visibility: 'none' },
    });
  });

  tbs.forEach((e) => {
    const { code, color } = e;
    map.addLayer({
      id: `gsf_tb_mt_${code}`,
      type: 'circle',
      source: 'geolab-layers',
      'source-layer': 'gsf_tb_mt',
      // minzoom: 13,
      paint: { 'circle-color': color, 'circle-radius': CircleSize },
      layout: { visibility: 'none' },
    });
  });

  rglt.forEach((e) => {
    const { code, color } = e;
    map.addLayer({
      id: `gsf_rglt_mt_${code}`,
      type: 'circle',
      source: 'geolab-layers',
      'source-layer': 'gsf_rglt_mt',
      // minzoom: 13,
      paint: { 'circle-color': color, 'circle-radius': CircleSize },
      layout: { visibility: 'none' },
    });
  });
}
