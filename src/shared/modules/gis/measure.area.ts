import { area, polygon } from '@turf/turf';
import { useMapMeasureStore } from 'app/stores/mapMeasure';
import { Feature, FeatureCollection, LineString, Point, Position } from 'geojson';
import { GeoJSONSource, Map as AppMap, MapMouseEvent } from 'maplibre-gl';
import { measureTypes } from 'shared/constants/types/types';

const areaLayers = ['area-points', 'area-lines', 'area-fill'];
const areaSource = 'area-geo-source';

export function addAreaLayers(map: AppMap, source: FeatureCollection, measureType: measureTypes) {
  if (!map || !map.getStyle()) return;
  const areaValue = useMapMeasureStore.getState().areaValue;

  if (!map.getSource(areaSource)) {
    map.addSource(areaSource, { type: 'geojson', data: source });
    map.addLayer({
      id: areaLayers[0],
      type: 'circle',
      source: areaSource,
      paint: { 'circle-radius': 5, 'circle-color': '#000' },
      filter: ['in', '$type', 'Point'],
    });
    map.addLayer({
      id: areaLayers[1],
      type: 'line',
      source: areaSource,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#000', 'line-width': 2.5 },
      filter: ['in', '$type', 'LineString'],
    });
    map.addLayer({
      id: areaLayers[2],
      type: 'fill',
      source: areaSource,
      paint: {
        'fill-color': '#000',
        'fill-opacity': 0.1,
      },
    });
  }

  areaLayers.forEach((id) => {
    let visibility = measureType === 'area' ? 'visible' : 'none';
    if (id === areaLayers[0] && areaValue !== 0) visibility = 'none';
    map.setLayoutProperty(id, 'visibility', visibility);
  });
}

export const measureAreaAction = (e: MapMouseEvent) => {
  const map = e.target;
  if (!map) return;

  const source = useMapMeasureStore.getState().areaSource;
  const areaLayer = useMapMeasureStore.getState().areaLayer;

  const { lng, lat } = e.lngLat;
  const features = map.queryRenderedFeatures(e.point, { layers: [areaLayers[0]] }) || [];
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
      },
    };

    source.features.push(point);
  }

  if (source.features.length > 1) {
    const { features } = source;
    (areaLayer.geometry as LineString).coordinates = features.map((point) => (point.geometry as Point).coordinates);
    source.features.push(areaLayer);
  }

  useMapMeasureStore.getState().setAreaSource(source);
  (map.getSource(areaSource) as GeoJSONSource).setData(source);
};

export const measureAreaDeAction = (e: MapMouseEvent) => {
  const map = e.target;
  if (!map) return;

  const source = useMapMeasureStore.getState().areaSource;
  const areaLayer = useMapMeasureStore.getState().areaLayer;

  if (source.features.length < 4) alert('3개 이상 점이 필요합니다.');
  else {
    const firstPoint = source.features[0];
    source.features.push(firstPoint);

    const pointList = source.features.map((point) => (point.geometry as Point).coordinates);
    (areaLayer.geometry as LineString).coordinates = pointList;
    source.features.push(areaLayer);

    const tempList: Array<Position> = [];
    pointList.forEach((points) => {
      if (points.length === 2) tempList.push(points);
    });

    const getPolygon = polygon([tempList]);
    const getArea = area(getPolygon);
    useMapMeasureStore.getState().setAreaValue(getArea);
  }

  useMapMeasureStore.getState().setAreaSource(source);
  (map.getSource(areaSource) as GeoJSONSource).setData(source);
  console.log(source)
};

export function removeAreaLayers(map: AppMap) {
  if (!map || !map.getStyle() || !map.getSource(areaSource)) return;

  areaLayers.forEach((id) => map.removeLayer(id));
  map.removeSource(areaSource);
}
