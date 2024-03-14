import { area as TurfMeasureArea } from '@turf/turf';
import { Feature, LineString, Point, Polygon } from 'geojson';
import { MapMouseEvent } from 'maplibre-gl';

import { GeolabDrawModelTypes } from './drawing.tool.types';
import { GeolabDrawingTool, lineFeature, polygonFeature } from './main';

export class GeolabPolygonDraw extends GeolabDrawingTool {
  #lineFeatureIdx = 1;
  #polygonFeatureIdx = 0;
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
    this.setFeatureType('Polygon');
    const polygon = JSON.parse(JSON.stringify(polygonFeature));
    const line = JSON.parse(JSON.stringify(lineFeature));
    source.features = [polygon, line];
    map.addSource(sourceId, { type: 'geojson', data: source });
    this.initFeatureLayers('polygon');
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
      (source.features[0].geometry as Polygon).coordinates = [[...this.getVertices(), [lng, lat]]];
      this.redraw();
    };
    const contextmenuHandler = (e: MapMouseEvent) => {
      e.originalEvent.preventDefault();
      map.off('click', clickHandler);
      map.off('mousemove', mousemoveHandler);
      map.off('contextmenu', contextmenuHandler);
      const { source } = this;
      const { lng, lat } = e.lngLat;
      this.#draw(lng, lat);
      const start = (source.features[2].geometry as Point).coordinates;
      (source.features[1].geometry as LineString).coordinates.push(start);
      this.redraw();
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
    if (source.features.length > 2) this.addPolygon(this.#polygonFeatureIdx);
    this.redraw();
  }

  getArea() {
    const polygon = this.getGeojson();
    const area = TurfMeasureArea(polygon);
    return area;
  }
}

export const PolygonDraw = new GeolabPolygonDraw();
