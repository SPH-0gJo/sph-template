import { Source } from 'maplibre-gl';
import { create } from 'zustand';


export interface layerInfo{
  description:string;
  fields:object;
  id:string;
  maxzoom:number;
  minzoom:number;
}
interface MobileMapState {
  mapButtonAction:string;
  setMapButtonAction:(mapButtonAction:string) => void;

  mapInfoView:boolean;
  setMapInfoView:(mapInfoView:boolean) => void;

  mapLayerView:boolean;
  setMapLayerView:(mapLayerView:boolean) => void;

  mapLayerViewList:Set<string>;
  setMapLayerViewList:(mapLayerViewList:Set<string>) => void;
}

export const useMobileMapStore = create<MobileMapState>()(set=> ({
  mapButtonAction:'',
  setMapButtonAction:(mapButtonAction:string) =>
    set(()=>({
      mapButtonAction: mapButtonAction
    })),

  mapInfoView:false,
  setMapInfoView:(mapInfoView:boolean) =>
    set(()=>({
      mapInfoView: mapInfoView
    })),

  mapLayerView:false,
  setMapLayerView:(mapLayerView:boolean) =>
    set(()=>({
      mapLayerView: mapLayerView
    })),

  mapLayerViewList:new Set,
  setMapLayerViewList:(mapLayerViewList:Set<string>) =>
    set(()=>({
      mapLayerViewList : mapLayerViewList
    })),

}))
