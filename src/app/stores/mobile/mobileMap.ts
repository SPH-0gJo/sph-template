import { create } from 'zustand';

interface MobileMapState {
  mapButtonAction:string;
  setMapButtonAction:(mapButtonAction:string) => void;
}

export const useMobileMapStore = create<MobileMapState>()(set=> ({
  mapButtonAction:'',
  setMapButtonAction:(mapButtonAction:string) =>
    set(()=>({
      mapButtonAction: mapButtonAction
    })),
}))
