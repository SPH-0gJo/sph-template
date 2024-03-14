import { distance as TurfDistance, point as TurfPoint } from '@turf/turf';
import { Feature, LineString, Point, Position } from 'geojson';
import { MapMouseEvent } from 'maplibre-gl';

import { GeolabDrawModelTypes } from './drawing.tool.types';
import { GeolabDrawingTool, lineFeature } from './main';

export class GeolabCircleDraw extends GeolabDrawingTool {
  #lineFeatureIdx = 0;
  #circleFeatureIdx = 1;
  center: Feature<Point>;
  start: Position | null;
  constructor() {
    super();
    this.start = null;
    this.center = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [] },
      properties: {},
    };
  }

  main(payload: GeolabDrawModelTypes) {
    super.main(payload);
    this.#initMap();
    this.#events();
  }

  #initMap() {
    const { map, source, sourceId } = this;
    if (!map) return;
    this.setFeatureType('Point');
    const line = JSON.parse(JSON.stringify(lineFeature));
    this.source.features = [line, this.center];
    this.map?.addSource(sourceId, { type: 'geojson', data: source });
    this.initFeatureLayers('circle');
  }

  #events() {
    const map = this.map;
    if (!map) return;
    const clickHandler = (e: MapMouseEvent) => {
      const { lng, lat } = e.lngLat;
      const { x, y } = e.point;
      const features = map.queryRenderedFeatures([x, y], { layers: [this.vertexLayerId] }) || [];
      if (!features.length) {
        const { source } = this;
        (source.features[this.#circleFeatureIdx].geometry as Point).coordinates = [lng, lat];
        source.features[this.#circleFeatureIdx].properties = { radius: 5, opacity: 0.3, start: [x, y] };
      }
    };
    const mousemoveHandler = (e: MapMouseEvent) => {
      const { source } = this;
      const { lng, lat } = e.lngLat;
      const { x, y } = e.point;
      const [centerPosition] = this.getVertices();
      if (!centerPosition.length) return;
      (source.features[this.#lineFeatureIdx].geometry as LineString).coordinates = [centerPosition, [lng, lat]];
      const circleFeature = source.features[this.#circleFeatureIdx];
      if (!circleFeature) return;
      const props = circleFeature.properties;
      const [centerX, centerY] = props?.start || {};
      const a = x - centerX;
      const b = y - centerY;
      const radius = Math.sqrt(a * a + b * b);
      circleFeature.properties = { ...props, radius };
      this.redraw();
    };

    const contextmenuHandler = (e: MapMouseEvent) => {
      e.originalEvent.preventDefault();
      map.off('click', clickHandler);
      map.off('mousemove', mousemoveHandler);
      map.off('contextmenu', contextmenuHandler);
      const { lng, lat } = e.lngLat;
      this.#draw(lng, lat);
    };

    map.on('click', clickHandler);
    map.on('mousemove', mousemoveHandler);
    map.on('contextmenu', contextmenuHandler);
  }

  #draw(lng: number, lat: number) {
    const center = this.center.geometry.coordinates;
    const from = TurfPoint([...center]);
    const to = TurfPoint([lng, lat]);
    const radius = TurfDistance(from, to);
    const point: Feature<Point> = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: center },
      properties: { radius, opacity: 0.3 },
    };
    this.source?.features.push(point);
    this.redraw();
  }
}

/* eslint-disable */
export const CircleDraw = new GeolabCircleDraw();
