import React, { useEffect, useRef } from 'react';
import { MapToolbox } from 'app/components/common/map/toolbox/MapToolbox';
import { DataTable } from 'app/components/common-ui';
import { GSFLayerBox } from 'app/components/pages/facility-management/pipeline-management-system/GSFLayerBox';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap } from 'maplibre-gl';
import { LayerStyle } from 'shared/fixtures/pipeline';
import { drawNRemoveLayers, measureDistanceAction } from 'shared/modules/gis/measure.distance';
import { addVectorTiles } from 'shared/modules/gis/pipeline.vector.tiles';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

import 'maplibre-gl/dist/maplibre-gl.css';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-area: content;
`;

const MapViewerWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: crosshair;
`;

export const MapViewer = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<AppMap | null>(null);
  const { measureType, style, zoomLevel: zoom } = useMapOptionsStore();
  const { setLayerGroup } = useGsfLayerStore();
  const { gsfLayerGroups, layerStyleEditorId } = useGsfLayerStore();

  useEffect(() => {
    if (map.current || !mapContainer) return;
    setLayerGroup();
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 0, undefined);
    map.current.on('load', () => {
      map.current?.loadImage('/assets/images/img_1.png', (error, image) => {
        if (error) throw error;
        if (!image) return;
        map.current?.addImage('shop-icon', image, { sdf: true });
        map.current && addVectorTiles(map.current);
      });
      map.current?.fitBounds([
        [126.51718139648438, 35.9637451171875], // southwestern corner of the bounds
        [127.57186889648438, 36.98272705078125], // northeastern corner of the bounds
      ]);
    });
    return () => map.current?.remove();
  }, []);

  useEffect(() => {
    if (!map.current || !style) return;
    map.current.setStyle(style, { diff: false });
    map.current.once('styledata', () => map.current && addVectorTiles(map.current));
  }, [style]);

  useEffect(() => {
    if (!map.current || !zoom) return;
    map.current?.zoomTo(zoom, { duration: 1000 });
  }, [zoom]);

  useEffect(() => {
    if (!map.current) return;
    const measure = measureType !== 'none';
    const style = map.current.getCanvas().style;
    style.cursor = measureType !== 'none' ? 'crosshair' : 'default';
    drawNRemoveLayers(map.current, measure);
    measure && map.current.on('click', measureDistanceAction);
    !measure && map.current.off('click', measureDistanceAction);
  }, [measureType]);

  useEffect(() => {
    if (!gsfLayerGroups || !map.current || !layerStyleEditorId) return;
    const layer = gsfLayerGroups.get(layerStyleEditorId);
    const { style } = layer!;
    if (!style) return;
    let paintProperties = ['line-color', 'line-width'];
    if (Object.prototype.hasOwnProperty.call(style, 'circle-color'))
      paintProperties = ['circle-color', 'circle-radius'];
    paintProperties.forEach(
      (propertyName) =>
        map.current?.setPaintProperty(layerStyleEditorId, propertyName, style[propertyName as keyof LayerStyle]),
    );
  }, [gsfLayerGroups, layerStyleEditorId]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      <MapToolbox />
      <GSFLayerBox data={{ appMap: map.current }} />
      <DataTable />
    </MapContainer>
  );
};
