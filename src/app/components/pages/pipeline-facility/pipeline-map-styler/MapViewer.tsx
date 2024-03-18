import React, { useEffect, useRef } from 'react';
import { MapToolbox } from 'app/components/common/map/toolbox/MapToolbox';
import { GasLayerBox } from 'app/components/pages/pipeline-facility/pipeline-map-styler/GasLayerBox';
import { useGasLayerGropuStore } from 'app/stores/gas-layers/gas.layer.groups';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap } from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { LayerStyle } from 'shared/fixtures/pipeline';
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
  const { style, zoomLevel: zoom, setStyleOption } = useMapOptionsStore();
  const { gasLayerGroups, layerStyleEditorId, setLayerGroup } = useGasLayerGropuStore();

  useEffect(() => {
    if (map.current || !mapContainer) return;
    setLayerGroup();
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 0, undefined);
    map.current.on('load', () => {
      map.current && addVectorTiles(map.current);
      map.current?.fitBounds([
        [126.51718139648438, 35.9637451171875], // southwestern corner of the bounds
        [127.57186889648438, 36.98272705078125], // northeastern corner of the bounds
      ]);
    });
    return () => {
      setStyleOption(vectorTileBaseMaps[0].style);
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !style) return;
    map.current.setStyle(style, { diff: false });
    map.current.once('styledata', () => map.current && addVectorTiles(map.current));
  }, [style]);

  // useEffect(() => {
  //   if (!gasLayerGroups || !map.current || !layerStyleEditorId) return;
  //   const layer = gasLayerGroups.get(layerStyleEditorId);
  //   const { style } = layer!;
  //   if (!style) return;
  //   const paintProperties = Object.keys(style);
  //   paintProperties.forEach(
  //     (propertyName) =>
  //       map.current?.setPaintProperty(layerStyleEditorId, propertyName, style[propertyName as keyof LayerStyle]),
  //   );
  // }, [gasLayerGroups, layerStyleEditorId]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      <MapToolbox data={{ appMap: map.current }} />
      <GasLayerBox data={{ appMap: map.current }} />
    </MapContainer>
  );
};
