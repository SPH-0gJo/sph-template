import { GeolabMenus } from 'shared/fixtures/menu.items';
const commonApis = {
  menuItems: () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(GeolabMenus);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export { commonApis };
