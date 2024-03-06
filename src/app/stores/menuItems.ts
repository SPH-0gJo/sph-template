import { commonApis } from 'app/api/common.api';
import { GeolabMenuItems } from 'shared/constants/types/types';
import { create } from 'zustand';

interface MenuItemState {
  menuItems: GeolabMenuItems[];
  fetch: () => void;
}

export const useCommonStore = create<MenuItemState>()((set) => ({
  menuItems: [],
  fetch: async () => {
    try {
      const result = (await commonApis.menuItems()) as GeolabMenuItems[];
      const parents: Map<string, GeolabMenuItems> = new Map();
      result.forEach((e) => {
        const { id, parent_id: parentId } = e;
        const key = id + '';
        if (!parentId) {
          parents.set(key, e);
          return;
        }
        const parentKey = parentId + '';
        const parent = parents.get(parentKey);
        if (!parent) return;
        if (parent.children === undefined) parent.children = [];
        parent?.children.push(e);
        parents.set(parentKey, parent);
      });
      const menuItems = [...parents].map((e) => e[1]);
      set({ menuItems });
    } catch (e) {
      console.error(e);
    }
  },
}));
