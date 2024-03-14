import { Feature, FeatureCollection, LineString, Point, Polygon } from 'geojson';
import { GeoJSONSource, Map as AppMap } from 'maplibre-gl';

export interface GeolabDrawModelTypes {
  map: AppMap | null;
}

export const featureCollection: FeatureCollection = {
  type: 'FeatureCollection',
  features: [],
};

export class GeolabDrawingModel {
  map: AppMap | null;
  source: FeatureCollection;
  sourceId: string;
  vertexLayerId: string;
  arcLayerId: string;
  fillLayerId: string;

  constructor() {
    this.map = null;
    this.source = featureCollection;
    this.sourceId = 'geolab-draw-source';
    this.vertexLayerId = 'polygon-vertices';
    this.arcLayerId = 'polygon-arcs';
    this.fillLayerId = 'polygon-fill';
  }

  main(payload: GeolabDrawModelTypes) {
    if (!payload.map) return;
    this.map = payload.map;
  }

  getVertices() {
    const { features } = this.source;
    return features
      .filter((feature) => feature.geometry.type === 'Point')
      .map((point) => (point.geometry as Point).coordinates);
  }

  addLine(idx: number) {
    const { source } = this;
    (source.features[idx].geometry as LineString).coordinates = [...this.getVertices()];
  }

  addPolygon(idx: number) {
    const { source } = this;
    (source.features[idx].geometry as Polygon).coordinates = [[...this.getVertices()]];
  }

  redraw() {
    const { map, source, sourceId } = this;
    (map?.getSource(sourceId) as GeoJSONSource).setData(source);
  }

  addFeatureLayers(featureType: string) {
    const { map, sourceId, arcLayerId, vertexLayerId, fillLayerId } = this;
    if (!map) return;
    map.addLayer({
      id: arcLayerId,
      type: 'line',
      source: sourceId,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#106520', 'line-width': 1, 'line-dasharray': [2, 2] },
      filter: ['in', '$type', 'LineString'],
    });
    map.addLayer({
      id: vertexLayerId,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-radius': 5,
        'circle-color': '#119229',
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 2,
      },
      filter: ['in', '$type', 'Point'],
    });
    featureType === 'polygon' &&
      map.addLayer({
        id: fillLayerId,
        type: 'fill',
        source: sourceId,
        paint: { 'fill-color': '#000', 'fill-opacity': 0.1 },
        filter: ['in', '$type', 'Polygon'],
      });
    // console.log(map?.getStyle());
  }
  #draw() {
    throw new Error('You have to implement the method.');
  }

  destroy() {
    console.log('destroy', this.map?.getStyle());
    this.map?.removeSource(this.sourceId);
  }
}

export const lineFeature: Feature<LineString> = {
  type: 'Feature',
  geometry: { type: 'LineString', coordinates: [] },
  properties: {},
};

export const polygonFeature: Feature<Polygon> = {
  type: 'Feature',
  geometry: { type: 'Polygon', coordinates: [] },
  properties: {},
};
