import { Map } from 'maplibre-gl';

const styleUrl = 'http://localhost:8081/data/pipeline_samplesv2.json';
const circleSize = 3;
const pipelines = [
  { code: '2010', color: '#fc03e3', width: 1.5, lineStyle: 'solid' },
  { code: '2013', color: '#fc03e3', width: 1, lineStyle: 'dashed' },
  { code: '2020', color: '#ff000d', width: 1.5, lineStyle: 'solid' },
  { code: '2022', color: '#ff000d', width: 1, lineStyle: 'solid' },
  { code: '2023', color: '#ff000d', width: 1, lineStyle: 'dashed' },
  { code: '2031', color: '#0037ff', width: 1.5, lineStyle: 'solid' },
  { code: '2032', color: '#0037ff', width: 1, lineStyle: 'solid' },
  { code: '2033', color: '#0037ff', width: 1, lineStyle: 'dashed' },
];

const valves = [
  { code: '2310', color: '#fc03e3' },
  { code: '2313', color: '#002869' },
  { code: '2320', color: '#ff000d' },
  { code: '2322', color: '#9d00ff' },
  { code: '2323', color: '#ff6f00' },
  { code: '2331', color: '#0800ff' },
  { code: '2332', color: '#00b7ff' },
  { code: '2333', color: '#0f0404' },
];

const tbs = [
  { code: '2240', color: '#fc03e3' },
  { code: '2241', color: '#fc03e3' },
  { code: '2242', color: '#fc03e3' },
];

const rglt = [
  { code: '2111', color: '#fc03e3' },
  { code: '2112', color: '#fc03e3' },
];

export function addVectorTiles(map: Map) {
  if (!map || !map.getStyle()) return;
  const source = map.getSource('geolab-layers');
  if (source) return;
  map.addSource('geolab-layers', { type: 'vector', url: styleUrl });
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
      minzoom: 13,
      // layout: { 'icon-image': 'shop-icon', 'icon-size': 0.4 },
      paint: { 'circle-color': color, 'circle-radius': circleSize },
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
      minzoom: 13,
      paint: { 'circle-color': color, 'circle-radius': circleSize },
    });
  });

  rglt.forEach((e) => {
    const { code, color } = e;
    map.addLayer({
      id: `gsf_rglt_mt_${code}`,
      type: 'circle',
      source: 'geolab-layers',
      'source-layer': 'gsf_rglt_mt',
      minzoom: 13,
      paint: { 'circle-color': color, 'circle-radius': circleSize },
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
}
