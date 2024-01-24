import maplibregl, { Map as AppMap, MapMouseEvent } from 'maplibre-gl';
import { CircleSize, GeolabVectorTileStyle } from 'shared/constants/varibales';
import { pipelines, rglt, tbs, valves } from 'shared/fixtures/pipeline';

export function addVectorTiles(map: AppMap) {
  if (!map || !map.getStyle()) return;
  const source = map.getSource('geolab-layers');
  if (source) return;
  map.addSource('geolab-layers', { type: 'vector', url: GeolabVectorTileStyle });

  pipelines.forEach((e) => {
    let highlightedLayerId: string | null = null;

    const { code, color, width, lineStyle } = e;
    const paint: { 'line-color': string; 'line-width': number; 'line-dasharray'?: Array<number> } = {
      'line-color': color,
      'line-width': width * 3,
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

    map.on('click',`gsf_pl_mt_${code}`,(e:MapMouseEvent)=>{
      if (e.originalEvent.cancelBubble) {
        return;
      }
      e.originalEvent.cancelBubble = true;

      if (highlightedLayerId) {
        map.setPaintProperty(highlightedLayerId, 'line-color', color);
        highlightedLayerId = null;
      }

      // 클릭한 레이어를 하이라이트 스타일로 변경
      highlightedLayerId = `gsf_pl_mt_${code}`;
      map.setPaintProperty(highlightedLayerId, 'line-color', 'yellow');


      const features = map.queryRenderedFeatures(e.point, { layers: [`gsf_pl_mt_${code}`] })[0].properties;

      let k = '<table>'
      k+= '<thead>';
      Object.keys(features).map((key)=>{
        k+= '<th>' + key + '</th>';
      })
      k+= '</thead>';
      k+= '<tbody>';
      k+= '<tr>';
      Object.keys(features).map((key)=>{
        k+= '<td>' + features[key] + '</td>';
      })
      k+= '</tr>';
      k+= '</tbody>';

      const transposedTableString = transposeTable(k);

      const popup = new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(transposedTableString);

      popup.on('close', () => {
        // 팝업이 닫힐 때 다시 원래 색상으로 변경
        if(highlightedLayerId){
          map.setPaintProperty(highlightedLayerId, 'line-color', color);
          highlightedLayerId = null;
        }
      });

      popup.addTo(map);

    })
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
function transposeTable(tableString: string): string {
  // HTML 문자열을 파싱하여 테이블 객체 생성
  const table = document.createElement('table');
  table.innerHTML = tableString;

  // 원본 테이블의 열과 행을 가져옴
  const rows = table.querySelectorAll('tr');
  const cols = rows[0].querySelectorAll('td, th');

  // 새로운 행과 열을 만들기 위한 빈 문자열 배열 생성
  const transposedRows: string[][] = Array.from(cols).map(() => []);

  // 테이블의 각 행을 돌면서 열과 행을 바꾸어 새로운 배열에 저장
  rows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll('td, th');
    cells.forEach((cell, colIndex) => {
      transposedRows[colIndex][rowIndex] = cell.innerHTML;
    });
  });

  // 새로운 행과 열을 이용하여 테이블 문자열 생성
  const transposedTable = transposedRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('');

  return `<table>${transposedTable}</table>`;
}