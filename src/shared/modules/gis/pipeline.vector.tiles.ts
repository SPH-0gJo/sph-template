import { Map as AppMap } from 'maplibre-gl';
import { CircleSize, GeolabVectorTileStyle } from 'shared/constants/varibales';
import { pipelines, rglt, tbs, valves } from 'shared/fixtures/pipeline';

export function addVectorTiles(map: AppMap) {
  if (!map || !map.getStyle()) return;
  const source = map.getSource('geolab-layers');
  if (source) return;
  map.addSource('geolab-layers', { type: 'vector', url: GeolabVectorTileStyle });
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
      layout: { 'line-join': 'round', 'line-cap': 'round' },
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
    });
  });

  map.addLayer({
    id: 'gsf_vv_mt_labels',
    type: 'symbol',
    source: 'geolab-layers',
    'source-layer': 'gsf_vv_mt',
    minzoom: 16,
    layout: {
      'text-field': ['get', 'GIS_VV_TYP'],
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto',
    },
  });

  map.addLayer({
    id: 'gsf_tb_mt_labels',
    type: 'symbol',
    source: 'geolab-layers',
    'source-layer': 'gsf_tb_mt',
    minzoom: 16,
    layout: {
      'text-field': ['get', 'GIS_VV_TYP'],
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto',
    },
  });

  map.addLayer({
    id: 'gsf_rglt_mt_labels',
    type: 'symbol',
    source: 'geolab-layers',
    'source-layer': 'gsf_rglt_mt',
    minzoom: 16,
    layout: {
      'text-field': ['get', 'GIS_VV_TYP'],
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto',
    },
  });
}

export function removeVectorTiles(map: AppMap) {
  if (!map || !map.getStyle()) return;
  pipelines.forEach(({ code }) => {
    map.removeLayer(`gsf_pl_mt_${code}`);
  });
  valves.forEach(({ code }) => {
    map.removeLayer(`gsf_vv_mt_${code}`);
  });
  tbs.forEach(({ code }) => {
    map.removeLayer(`gsf_tb_mt_${code}`);
  });
  rglt.forEach(({ code }) => {
    map.removeLayer(`gsf_rglt_mt_${code}`);
  });

  map.removeLayer('gsf_vv_mt_labels');
  map.removeLayer('gsf_tb_mt_labels');
  map.removeLayer('gsf_rglt_mt_labels');
}