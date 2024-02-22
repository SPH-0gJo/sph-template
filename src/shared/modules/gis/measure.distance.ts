import { length } from '@turf/turf';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Feature, FeatureCollection, LineString, Point } from 'geojson';
import { GeoJSONSource, Map as AppMap, MapMouseEvent } from 'maplibre-gl';
import { measureTypes } from 'shared/constants/types/types';

const measureLayers = ['measure-lines', 'measure-points'];
const measureSource = 'measure-geojson';

export function addMeasureLayers(map: AppMap, sourceGeojson: FeatureCollection, measureType: measureTypes) {
  if (!map || !map.getStyle()) return;
  if (!map.getSource(measureSource)) {
    map.addSource(measureSource, { type: 'geojson', data: sourceGeojson });
    map.addLayer({
      id: 'measure-points',
      type: 'circle',
      source: measureSource,
      paint: { 'circle-radius': 5, 'circle-color': '#000' },
      filter: ['in', '$type', 'Point'],
    });
    map.addLayer({
      id: 'measure-lines',
      type: 'line',
      source: measureSource,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#000', 'line-width': 2.5 },
      filter: ['in', '$type', 'LineString'],
    });
  }

  measureLayers.forEach((id) => {
    const visibility = measureType === 'distance' ? 'visible' : 'none';
    map.setLayoutProperty(id, 'visibility', visibility);
  });
}

export const measureDistanceAction = (e: MapMouseEvent) => {
  const map = e.target;
  if (!map) return;
  const sourceGeojson = useMapOptionsStore.getState().measureSource;
  const measuredLayer = useMapOptionsStore.getState().measureLayer;

  const features = map.queryRenderedFeatures(e.point, { layers: ['measure-points'] }) || [];
  sourceGeojson.features.length > 1 && sourceGeojson.features.pop();
  if (features.length) {
    const id = features[0].properties.id;
    sourceGeojson.features = sourceGeojson.features.filter((point: Feature) => point.properties?.id !== id);
  } else {
    const { lng, lat } = e.lngLat;
    const point: Feature<Point> = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [lng, lat] },
      properties: { id: String(new Date().getTime()) },
    };
    sourceGeojson.features.push(point);
  }

  if (sourceGeojson.features.length > 1) {
    const { features } = sourceGeojson;
    (measuredLayer.geometry as LineString).coordinates = features.map((point) => (point.geometry as Point).coordinates);
    sourceGeojson.features.push(measuredLayer);
    useMapOptionsStore.getState().setMeasureValue(length(measuredLayer));
  }

  useMapOptionsStore.getState().setMeasureSource(sourceGeojson);
  useMapOptionsStore.getState().setMeasureLayer(measuredLayer);
  (map.getSource('measure-geojson') as GeoJSONSource).setData(sourceGeojson);
};

export function removeMeasureLayers(map: AppMap) {
  if (!map || !map.getStyle() || !map.getSource(measureSource)) return;

  measureLayers.forEach((id) => map.removeLayer(id));
  map.removeSource(measureSource);
}
