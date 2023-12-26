import { create } from 'zustand';
import { MainMenu } from 'shared/constants/types';
import { commonApis } from 'app/api/common.api';

interface MenuItemState {
  menuItems: MainMenu[];
  fetch: () => void;
}

export const useCommonStore = create<MenuItemState>()((set) => ({
  menuItems: [],
  fetch: async () => {
    try {
      const menuItems = (await commonApis.menuItems()) as MainMenu[];
      set({ menuItems });
    } catch (e) {
      console.error(e);
    }
  },
}));
