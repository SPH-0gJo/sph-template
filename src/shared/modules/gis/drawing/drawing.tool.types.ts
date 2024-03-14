import { Map as AppMap } from 'maplibre-gl';

export type GeolabDrawFeatureType = 'Point' | 'Polygon' | 'LineString';

export interface GeolabDrawModelTypes {
  map: AppMap | null;
  callback?: () => void | undefined;
}
