import { MainMenus } from 'shared/fixtures/menu.items';
const commonApis = {
  menuItems: () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(MainMenus);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export { commonApis };
