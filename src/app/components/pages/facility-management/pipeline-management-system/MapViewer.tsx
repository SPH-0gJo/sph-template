import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Map as AppMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { initMap } from 'shared/modules/map.utils';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { measureDistanceAction, drawNRemoveLayers } from './measure.distance';
import { addVectorTiles } from 'app/components/pages/facility-management/pipeline-management-system/pipeline.vector.tiles';

import { MapToolbox } from 'app/components/common/map/toolbox/MapToolbox';
import { GSFLayerBox } from 'app/components/pages/facility-management/pipeline-management-system/GSFLayerBox';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { DataTable } from 'app/components/common-ui';

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

  useEffect(() => {
    if (map.current || !mapContainer) return;
    setLayerGroup();
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 0);
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
      return () => map.current?.remove();
    });
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

  // useEffect(() => {
  //   if (!map.current?.getStyle()) return;
  //   const layerId = 'gsf_pl_mt_2031';
  //   const visible = hiddenLayers.includes('2031') ? 'visible' : 'none';
  //   console.log(map.current?.getLayer('layer_002'));
  //   map.current?.setLayoutProperty(layerId, 'visibility', visible);
  // }, [hiddenLayers]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      <MapToolbox />
      <GSFLayerBox data={{ appMap: map.current }} />
      <DataTable />
    </MapContainer>
  );
};
