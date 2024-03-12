import { Feature, LineString, Point, Polygon } from 'geojson';
import { MapMouseEvent } from 'maplibre-gl';

import { GeolabDrawingModel, GeolabDrawModelTypes, lineFeature, polygonFeature } from './main';

export class GeolabPolygonDraw extends GeolabDrawingModel {
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

  getPolygon() {
    return this.source.features[this.#polygonFeatureIdx];
  }

  remove() {
    console.log('remove');
    this.map?.removeLayer(this.vertexLayerId);
    this.map?.removeLayer(this.arcLayerId);
    this.map?.removeLayer(this.fillLayerId);
    super.destroy();
  }

  #initMap() {
    if (!this.map) return;
    const id = this.sourceId;
    const source = this.source;
    source.features = [polygonFeature, lineFeature];
    this.map?.addSource(id, { type: 'geojson', data: source });
    this.addFeatureLayers('polygon');
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
      const source = this.source;
      const { lng, lat } = e.lngLat;
      const vertices = this.getVertices();
      if (!vertices.length) return;
      (source.features[0].geometry as Polygon).coordinates = [[...this.getVertices(), [lng, lat]]];
      this.redraw();
    };
    const dbclickHandler = (e: MapMouseEvent) => {
      e.originalEvent.preventDefault();
      map.off('click', clickHandler);
      map.off('mousemove', mousemoveHandler);
      map.off('contextmenu', dbclickHandler);
      const { source } = this;
      const { lng, lat } = e.lngLat;
      this.#draw(lng, lat);
      const start = (source.features[2].geometry as Point).coordinates;
      (source.features[1].geometry as LineString).coordinates.push(start);
      this.redraw();
    };
    map.on('click', clickHandler);
    map.on('mousemove', mousemoveHandler);
    map.on('contextmenu', dbclickHandler);
  }

  #draw(lng: number, lat: number) {
    const point: Feature<Point> = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [lng, lat] },
      properties: { id: String(new Date().getTime()) },
    };
    const { source } = this;
    source?.features.push(point);
    if (source.features.length > 1) this.addLine(this.#lineFeatureIdx);
    if (source.features.length > 2) this.addPolygon(this.#polygonFeatureIdx);
    this.redraw();
  }
}
