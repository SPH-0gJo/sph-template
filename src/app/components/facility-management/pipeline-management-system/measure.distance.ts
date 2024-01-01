import { Map, MapMouseEvent, GeoJSONSource } from 'maplibre-gl';
import { Feature, FeatureCollection, Point, LineString } from 'geojson';
import { length } from '@turf/turf';
import { useMapOptionsStore } from 'app/stores/mapOptions';

const sourceGeojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [],
};

const measuredLayer: Feature<LineString> = {
  type: 'Feature',
  geometry: { type: 'LineString', coordinates: [] },
  properties: {},
};

export const drawNRemoveLayers = (map: Map, check: boolean) => {
  if (!map || !map.getStyle()) return;
  const layers = ['measure-lines', 'measure-points'];
  const source = 'measure-geojson';
  if (!check && map.getSource(source)) {
    layers.forEach((id) => map.removeLayer(id));
    map.removeSource(source);
    sourceGeojson.features = [];
    measuredLayer.geometry.coordinates = [];
    return;
  }

  map.addSource('measure-geojson', { type: 'geojson', data: sourceGeojson });
  map.addLayer({
    id: 'measure-points',
    type: 'circle',
    source,
    paint: { 'circle-radius': 5, 'circle-color': '#000' },
    filter: ['in', '$type', 'Point'],
  });
  map.addLayer({
    id: 'measure-lines',
    type: 'line',
    source,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: { 'line-color': '#000', 'line-width': 2.5 },
    filter: ['in', '$type', 'LineString'],
  });
};

export const measureDistanceAction = (e: MapMouseEvent) => {
  const map = e.target;
  if (!map) return;
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
    useMapOptionsStore.getState().setMeasuredValue(length(measuredLayer).toLocaleString());
  }
  (map.getSource('measure-geojson') as GeoJSONSource).setData(sourceGeojson);
};
