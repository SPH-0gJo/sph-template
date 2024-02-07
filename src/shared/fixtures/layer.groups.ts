import { Map as AppMap } from 'maplibre-gl';
import { addVectorTiles } from 'shared/modules/gis/pipeline.vector.tiles';

export interface LayerGroup {
  [key: string]: {
    layers: Array<string>;
    boundary: Array<Array<number>>;
  }
}

export const LayerGroupData: LayerGroup = {
  pipeline: {
    layers: ['gsf_pl_mt', 'gsf_vv_mt', 'gsf_tb_mt', 'gsf_rglt_mt'],
    boundary: [[126.51718139648438, 35.9637451171875], [127.57186889648438, 36.98272705078125]]
  },
};

export const addGroupLayer = (map: AppMap, layerIdList: Array<string>) => {
  layerIdList.forEach(groupId => {
    if (groupId === 'pipeline') addVectorTiles(map);
  });

  const tempBound = layerIdList.map(groupId => {
    return LayerGroupData[groupId].boundary;
  });

  let [[LEFT, BOTTOM], [RIGHT, TOP]] = tempBound[0];
  tempBound.forEach(([[left, bottom], [right, top]]) => {
    if (right < RIGHT) RIGHT = right;
    if (left > LEFT) LEFT = left;
    if (bottom < BOTTOM) BOTTOM = bottom;
    if (top > TOP) TOP = top;
  });

  map.fitBounds([[LEFT, BOTTOM], [RIGHT, TOP]]);
};
