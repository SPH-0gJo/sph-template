import { Map as AppMap } from 'maplibre-gl';
import { pipelines, rglt, tbs, valves } from 'shared/fixtures/pipeline';
import { addVectorTiles, removeVectorTiles } from 'shared/modules/gis/pipeline.vector.tiles';

export interface LayerGroup {
  layers: Array<string>;
  boundary: Array<Array<number>>;
}

export type LayerGroupKeys = 'pipeline';

export const addClickLayer = (map: AppMap, layerId: LayerGroupKeys, layerGroupsList: Array<string>) => {
  LayerGroupData[layerId].layers.forEach((layer) => {
    let data: { code: string; color: string; width?: number; lineStyle?: string }[] = [];
    switch (layer) {
      case 'gsf_pl_mt':
        data = pipelines;
        break;
      case 'gsf_vv_mt':
        data = valves;
        break;
      case 'gsf_tb_mt':
        data = tbs;
        break;
      case 'gsf_rglt_mt':
        data = rglt;
        break;
      default:
        return;
    }

    const visibility = layerGroupsList.includes(layer) ? 'visible' : 'none';
    data.map(({ code }) => {
      map.setLayoutProperty(`${layer}_${code}`, 'visibility', visibility);
    });
  });
};

export const addGroupLayer = (map: AppMap, layerIdList: Array<LayerGroupKeys>) => {
  const keyList = Object.keys(LayerGroupData) as Array<LayerGroupKeys>;
  keyList.forEach((key) => {
    if (layerIdList.includes(key)) {
      if (key === 'pipeline') addVectorTiles(map);
    } else {
      if (key === 'pipeline') removeVectorTiles(map);
    }
  });
};

export const LayerGroupData: { [key in LayerGroupKeys]: LayerGroup } = {
  pipeline: {
    layers: ['gsf_pl_mt', 'gsf_vv_mt', 'gsf_tb_mt', 'gsf_rglt_mt'],
    boundary: [
      [126.51718139648438, 35.9637451171875],
      [127.57186889648438, 36.98272705078125],
    ],
  },
};

export const setFitBounds = (map: AppMap, layerIdList: Array<LayerGroupKeys>) => {
  const tempBound = layerIdList.map((groupId) => {
    return LayerGroupData[groupId].boundary;
  });

  let [[LEFT, BOTTOM], [RIGHT, TOP]] = tempBound[0];
  tempBound.forEach(([[left, bottom], [right, top]]) => {
    if (right < RIGHT) RIGHT = right;
    if (left > LEFT) LEFT = left;
    if (bottom < BOTTOM) BOTTOM = bottom;
    if (top > TOP) TOP = top;
  });

  map.fitBounds([
    [LEFT, BOTTOM],
    [RIGHT, TOP],
  ]);
};
