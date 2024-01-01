// eslint-disable-next-line camelcase
import { geo_data } from 'shared/fixtures/pipeline';

export const facilityManagementApi = {
  geoData: async () => {
    // eslint-disable-next-line camelcase
    return { data: geo_data };
  },
};

// export const facilityManagementDataProcessor = {
//   viewData: (data) => {
//     const geoDataMap = new Map();
//   },
// };
