import { Feature, LineString, Point } from 'geojson';
import { MapMouseEvent } from 'maplibre-gl';
import { GeolabDrawingModel, GeolabDrawModelTypes, lineFeature } from 'shared/modules/gis/drawing/main';

export class GeolabLineDraw extends GeolabDrawingModel {
  #lineFeatureIdx = 0;
  constructor() {
    super();
  }

  main(payload: GeolabDrawModelTypes) {
    super.main(payload);
    this.#initMap();
    this.#events();
  }

  #initMap() {
    if (!this.map) return;
    const { source, sourceId } = this;
    source.features = [lineFeature];
    this.map?.addSource(sourceId, { type: 'geojson', data: source });
    this.addFeatureLayers('line');
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
      (source.features[0].geometry as LineString).coordinates = [...this.getVertices(), [lng, lat]];
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
    const point: Feature<Point> = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [lng, lat] },
      properties: { id: String(new Date().getTime()) },
    };
    const { source } = this;
    source?.features.push(point);
    if (source.features.length > 1) this.addLine(this.#lineFeatureIdx);
    this.redraw();
  }

  getLine() {
    return this.source.features[this.#lineFeatureIdx];
  }

  remove() {
    console.log('destroy');
    this.map?.removeLayer(this.vertexLayerId);
    this.map?.removeLayer(this.arcLayerId);
    super.destroy();
  }
}
