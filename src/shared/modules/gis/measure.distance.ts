import { length } from '@turf/turf';
import { useMapMeasureStore } from 'app/stores/mapMeasure';
import { Feature, FeatureCollection, LineString, Point } from 'geojson';
import { GeoJSONSource, Map as AppMap, MapMouseEvent } from 'maplibre-gl';
import { measureTypes } from 'shared/constants/types/types';

const distanceLayers = ['distance-points', 'distance-lines', 'distance-labels'];
const distanceSource = 'distance-geo-source';

export function addDistanceLayers(map: AppMap, source: FeatureCollection, measureType: measureTypes) {
  if (!map || !map.getStyle()) return;
  if (!map.getSource(distanceSource)) {
    map.addSource(distanceSource, { type: 'geojson', data: source });
    map.addLayer({
      id: distanceLayers[0],
      type: 'circle',
      source: distanceSource,
      paint: { 'circle-radius': 5, 'circle-color': '#000' },
      filter: ['in', '$type', 'Point'],
    });
    map.addLayer({
      id: distanceLayers[1],
      type: 'line',
      source: distanceSource,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#000', 'line-width': 2.5 },
      filter: ['in', '$type', 'LineString'],
    });
    map.addLayer({
      id: distanceLayers[2],
      type: 'symbol',
      source: distanceSource,
      layout: {
        'text-field': ['format', ['get', 'label']],
        'text-offset': [0, 1.25],
      },
      paint: {
        'text-color': '#000',
      },
    });
  }

  distanceLayers.forEach((id) => {
    const visibility = measureType === 'distance' ? 'visible' : 'none';
    map.setLayoutProperty(id, 'visibility', visibility);
  });
}

export const measureDistanceAction = (e: MapMouseEvent) => {
  const map = e.target;
  if (!map) return;

  const source = useMapMeasureStore.getState().distanceSource;
  const distanceLayer = useMapMeasureStore.getState().distanceLayer;
  const beforeValue = useMapMeasureStore.getState().distanceValue;

  const { lng, lat } = e.lngLat;
  const features = map.queryRenderedFeatures(e.point, { layers: [distanceLayers[0]] }) || [];
  source.features.length > 1 && source.features.pop();
  if (features.length) {
    const id = features[0].properties.id;
    source.features = source.features.filter((point: Feature) => point.properties?.id !== id);
  } else {
    const point: Feature<Point> = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [lng, lat] },
      properties: {
        id: String(new Date().getTime()),
        label: source.features.length === 0 ? 'START' : '',
      },
    };

    source.features.push(point);
  }

  if (source.features.length > 1) {
    const { features } = source;
    (distanceLayer.geometry as LineString).coordinates = features.map((point) => (point.geometry as Point).coordinates);
    source.features.push(distanceLayer);

    let measureLength = length(distanceLayer);
    beforeValue.forEach((value) => {
      measureLength -= value;
    });
    useMapMeasureStore.getState().setDistanceValue([...beforeValue, measureLength]);
    source.features[source.features.length - 2].properties = {
      label: `${measureLength.toFixed(3)}km`,
    };
  }

  useMapMeasureStore.getState().setDistanceSource(source);
  (map.getSource(distanceSource) as GeoJSONSource).setData(source);
};

export function removeDistanceLayers(map: AppMap) {
  if (!map || !map.getStyle() || !map.getSource(distanceSource)) return;

  distanceLayers.forEach((id) => map.removeLayer(id));
  map.removeSource(distanceSource);
}
