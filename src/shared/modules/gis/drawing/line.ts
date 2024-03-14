import { distance as TurfMeasureLineDistance } from '@turf/turf';
import { Feature, LineString, Point } from 'geojson';
import { MapMouseEvent } from 'maplibre-gl';

import { GeolabDrawModelTypes } from './drawing.tool.types';
import { GeolabDrawingTool, lineFeature } from './main';

export class GeolabLineDraw extends GeolabDrawingTool {
  #lineFeatureIdx = 0;
  #startPointFeatureIds = 1;
  constructor() {
    super();
  }

  main(payload: GeolabDrawModelTypes) {
    super.main(payload);
    this.#initMap();
    this.#events();
  }

  #initMap() {
    const { map, source, sourceId } = this;
    if (!map) return;
    this.setFeatureType('LineString');
    const line = JSON.parse(JSON.stringify(lineFeature));
    source.features = [line];
    map.addSource(sourceId, { type: 'geojson', data: source });
    this.initFeatureLayers('line');
  }

  #events() {
    const map = this.map;
    if (!map) return;
    const clickHandler = (e: MapMouseEvent) => {
      const { lng, lat } = e.lngLat;
      const { x, y } = e.point;
      const features = map.queryRenderedFeatures([x, y], { layers: [this.vertexLayerId] }) || [];
      if (!features.length) this.#draw(lng, lat);
    };
    const mousemoveHandler = (e: MapMouseEvent) => {
      const { source } = this;
      const { lng, lat } = e.lngLat;
      const vertices = this.getVertices();
      if (!vertices.length) return;
      (source.features[this.#lineFeatureIdx].geometry as LineString).coordinates = [...this.getVertices(), [lng, lat]];
      this.redraw();
    };

    const contextmenuHandler = (e: MapMouseEvent) => {
      e.originalEvent.preventDefault();
      map.off('click', clickHandler);
      map.off('mousemove', mousemoveHandler);
      map.off('contextmenu', contextmenuHandler);
      const { lng, lat } = e.lngLat;
      this.#draw(lng, lat);
      this.callback();
    };

    map.on('click', clickHandler);
    map.on('mousemove', mousemoveHandler);
    map.on('contextmenu', contextmenuHandler);
  }

  #draw(lng: number, lat: number) {
    const point: Feature<Point> = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [lng, lat] },
      properties: { id: String(new Date().getTime()), radius: 5, opacity: 1 },
    };
    const { source } = this;
    source?.features.push(point);
    if (source.features.length > 1) this.addLine(this.#lineFeatureIdx);
    this.redraw();
  }

  getDistance() {
    const { source } = this;
    const from = source.features[this.#startPointFeatureIds] as Feature<Point>;
    const to = source.features.at(-1) as Feature<Point>;
    const distance = TurfMeasureLineDistance(from, to, 'meters');
    return distance;
  }
}

export const LineDraw = new GeolabLineDraw();
