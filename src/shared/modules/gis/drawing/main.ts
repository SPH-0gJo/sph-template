import { Feature, FeatureCollection, LineString, Point, Polygon } from 'geojson';
import { GeoJSONSource, Map as AppMap } from 'maplibre-gl';

import { GeolabDrawFeatureType, GeolabDrawModelTypes } from './drawing.tool.types';

export class GeolabDrawingTool {
  map: AppMap | null;
  featureType: GeolabDrawFeatureType | undefined;
  source: FeatureCollection;
  sourceId: string;
  vertexLayerId: string;
  arcLayerId: string;
  fillLayerId: string;
  callback: () => void;

  #lineFeatureIdx = 1;
  #polygonFeatureIdx = 0;
  constructor() {
    this.map = null;
    this.featureType = undefined;
    this.source = {
      type: 'FeatureCollection',
      features: [],
    };
    this.sourceId = 'geolab-draw-source';
    this.vertexLayerId = 'polygon-vertices';
    this.arcLayerId = 'polygon-arcs';
    this.fillLayerId = 'polygon-fill';
    this.callback = () => {};
  }

  main(payload: GeolabDrawModelTypes) {
    if (!payload.map) return;
    this.map = payload.map;
    if (payload.callback) this.callback = payload.callback;
    const style = this.map.getCanvas().style;
    style.cursor = 'crosshair';
  }

  setFeatureType(ftype: GeolabDrawFeatureType) {
    this.featureType = ftype;
  }

  getVertices() {
    const { features } = this.source;
    return features
      .filter((feature) => feature.geometry.type === 'Point')
      .map((point) => (point.geometry as Point).coordinates);
  }

  addLine(idx: number) {
    const { source } = this;
    if (source) (source.features[idx].geometry as LineString).coordinates = [...this.getVertices()];
  }

  addPolygon(idx: number) {
    const { source } = this;
    (source.features[idx].geometry as Polygon).coordinates = [[...this.getVertices()]];
  }

  redraw() {
    const { map, source, sourceId } = this;
    (map?.getSource(sourceId) as GeoJSONSource).setData(source);
  }

  initFeatureLayers(featureType: string) {
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
        'circle-radius': ['get', 'radius'],
        'circle-color': '#119229',
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 2,
        'circle-opacity': ['get', 'opacity'],
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
  }

  destroy() {
    const { map, vertexLayerId, arcLayerId, fillLayerId } = this;
    if (!map) return;
    [vertexLayerId, arcLayerId, fillLayerId].forEach((layerId) => {
      map.getLayer(layerId) && map.removeLayer(layerId);
    });
    map.removeSource(this.sourceId);
    const style = map.getCanvas().style;
    style.cursor = 'default';
    this.map = null;
  }

  getGeojson() {
    const idx = this.featureType === 'Polygon' ? this.#polygonFeatureIdx : this.#lineFeatureIdx;
    return this.source.features[idx];
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
