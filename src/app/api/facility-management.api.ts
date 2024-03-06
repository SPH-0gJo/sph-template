import helper from 'app/api/helper';
import { FeatureCollection, Point } from 'geojson';
// eslint-disable-next-line camelcase
import { geo_data } from 'shared/fixtures/pipeline';

const uris = {
  valves: () => '/src/shared/fixtures/valves.json',
};

const endPoints = { uris };

export const facilityManagementApi = {
  geoData: async () => {
    // eslint-disable-next-line camelcase
    return { data: geo_data };
  },
  valves: async () => helper.get<FeatureCollection<Point>>(endPoints.uris.valves()),
};
