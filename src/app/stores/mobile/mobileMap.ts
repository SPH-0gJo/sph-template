import { SvcRequest, SvcResponse } from 'shared/constants/types/mobile/openapi';
import { create } from 'zustand';

interface MobileMapState {
  mapButtonAction:string;
  setMapButtonAction:(mapButtonAction:string) => void;

  mapInfoView:boolean;
  setMapInfoView:(mapInfoView:boolean) => void;

  mapLayerView:boolean;
  setMapLayerView:(mapLayerView:boolean) => void;

  mapSearch:boolean;
  setMapSearch:(setMenuOpen:boolean) => void;

  mapSearchView:boolean;
  setMapSearchView:(mapSearchView:boolean) => void;

  mapLayerViewActiveList:Set<string>;
  setMapLayerViewActiveList:(mapLayerViewActiveList:Set<string>) => void;

  mapInfoList:Array<SvcResponse>;
  setMapInfoList:(mapInfoList:Array<SvcResponse>) => void;

  requestInfo:SvcRequest;
  setRequestInfo:(requestInfo:SvcRequest) => void;
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

  mapSearchView:false,
  setMapSearchView:(mapSearchView:boolean) =>
    set(()=>({
      mapSearchView: mapSearchView
    })),

  mapSearch:false,
  setMapSearch:(mapSearch:boolean) =>
    set(()=>({
      mapSearch: mapSearch
    })),

  mapLayerViewActiveList:new Set,
  setMapLayerViewActiveList:(mapLayerViewActiveList:Set<string>) =>
    set(()=>({
      mapLayerViewActiveList : mapLayerViewActiveList
    })),

  mapInfoList:[],
  setMapInfoList:(mapInfoList:Array<SvcResponse>) =>
    set(()=>({
      mapInfoList: mapInfoList
    })),

  requestInfo:{
    serviceKey:'',
    pageNo:'',
    numOfRows:'',
    viewType:'',
    BSI:'',
    SIGUN:'',
  },
  setRequestInfo:(requestInfo:SvcRequest) =>
    set(()=>({
      requestInfo: requestInfo
    })),

}))
