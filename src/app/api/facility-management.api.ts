// import helper from 'app/api/helper';
// import { FeatureCollection, Point } from 'geojson';
// eslint-disable-next-line camelcase
import { geo_data } from 'shared/fixtures/pipeline';
import valveMap from 'shared/fixtures/visualization/valves.json';

// const uris = {
//   valves: () => 'shared/fixtures/valves.ts',
// };
//
// const endPoints = { uris };

export const facilityManagementApi = {
  geoData: async () => {
    // eslint-disable-next-line camelcase
    return { data: geo_data };
  },
  valves: async () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(valveMap);
      } catch (e) {
        reject(e);
      }
    });
  },
};
