import { App } from 'app/containers/App';
import { generateGovernorLayerOption, useGovernorStylerStore } from 'app/stores/gas-layers/governor.styler';
import { generatePipelineLayerOption, usePipelineStylerStore } from 'app/stores/gas-layers/pipeline.styler';
import { generateTestboxLayerOption, useTestboxStylerStore } from 'app/stores/gas-layers/testbox.styler';
import { generateValveLayerOption, useValveStylerStore } from 'app/stores/gas-layers/valve.styler';
import { CircleLayerSpecification, LineLayerSpecification, Map as AppMap, SymbolLayerSpecification } from 'maplibre-gl';
import { GEOLAB_VECTOR_TILE_STYLE } from 'shared/constants/varibales';
import { pipelines, rglt, tbs, valves } from 'shared/fixtures/pipeline';

export function addVectorTiles(map: AppMap) {
  if (!map || !map.getStyle()) return;
  const sourceId = 'geolab-layers';
  const source = map.getSource(sourceId);
  if (source) return;
  map.addSource(sourceId, { type: 'vector', url: GEOLAB_VECTOR_TILE_STYLE });
  const pipelinePaints = usePipelineStylerStore.getState().paints;
  Object.keys(pipelinePaints).forEach((key) => {
    const option = generatePipelineLayerOption(key, sourceId);
    map.addLayer(option as LineLayerSpecification);
  });

  map.loadImage('/assets/images/valve.png', (error, image) => {
    if (error || !image) throw error;
    map.addImage('valve-icon', image, { sdf: true });
    const valvePaints = useValveStylerStore.getState().paints;
    Object.keys(valvePaints).forEach((key) => {
      const option = generateValveLayerOption(key, sourceId);
      map.addLayer(option as SymbolLayerSpecification);
    });
  });

  const testboxLayouts = useTestboxStylerStore.getState().layouts;
  Object.keys(testboxLayouts).forEach((key) => {
    const options = generateTestboxLayerOption(key, sourceId);
    map.addLayer(options[1] as SymbolLayerSpecification);
    map.addLayer(options[0] as CircleLayerSpecification);
  });

  const governorLayouts = useGovernorStylerStore.getState().layouts;
  governorLayouts &&
    Object.keys(governorLayouts).forEach((key) => {
      const options = generateGovernorLayerOption(key, sourceId);
      if (!options) return;
      map.addLayer(options[1] as SymbolLayerSpecification);
      map.addLayer(options[0] as CircleLayerSpecification);
    });

  map.addLayer({
    id: 'gsf_pl_mt_labels',
    type: 'symbol',
    source: 'geolab-layers',
    'source-layer': 'gsf_pl_mt',
    minzoom: 16,
    layout: {
      'symbol-placement': 'line',
      'text-field': ['format', ['get', 'PL_MNGNO'], '/'],
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
