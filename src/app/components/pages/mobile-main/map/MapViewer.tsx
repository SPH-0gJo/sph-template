import React, { useEffect, useRef } from 'react';
import { LayerBox } from 'app/components/pages/mobile-main/map/LayerBox';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { useMobileMapStore } from 'app/stores/mobile/mobileMap';
import { LngLatBoundsLike, Map as AppMap } from 'maplibre-gl';
import { pipelines, rglt, tbs, valves } from 'shared/fixtures/pipeline';
import { addVectorTilesMobile } from 'shared/modules/gis/pipeline.vector.tiles.mobile';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

import 'maplibre-gl/dist/maplibre-gl.css';

const MapContainer = styled.div`
  width: 100%;
  height: calc(100% - 3.625rem);
  grid-area: content;
  position: absolute;
  top: 3.625rem;
`;

const MapViewerWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: crosshair;
`;

export const MapViewer = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<AppMap | null>(null);
  const { zoomLevel: zoom } = useMapOptionsStore();
  const { mapButtonAction,setMapButtonAction,  mapLayerView, mapLayerViewList } = useMobileMapStore();

  const setMap = (bounds:LngLatBoundsLike) => {
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 0, undefined);
    map.current.on('load', () => {
      map.current?.fitBounds(bounds);
      if(map.current)
        addVectorTilesMobile(map.current);
    });
    return () => map.current?.remove();
  }

  const layerTrigger = (layer:string, visibility:string) => {
      switch (layer){
        case 'gas-pipe':
          pipelines.map((val)=>{
            map.current?.setLayoutProperty(`gsf_pl_mt_${val.code}`, 'visibility', visibility);
          })
          break;
        case 'gas-valve':
          valves.map((val)=>{
            map.current?.setLayoutProperty(`gsf_vv_mt_${val.code}`, 'visibility', visibility);
          })
          break;
        case 'gas-tb':
          tbs.map((val)=>{
            map.current?.setLayoutProperty(`gsf_tb_mt_${val.code}`, 'visibility', visibility);
          })
          break;
        case 'gas-gauge':
          rglt.map((val)=>{
            map.current?.setLayoutProperty(`gsf_rglt_mt_${val.code}`, 'visibility', visibility);
          })
          break;
      }
  }

  useEffect(() => {
    if (map.current || !mapContainer) return;
    const bbox:LngLatBoundsLike = [
      [126.9759123, 37.2085123],
      [126.9759123, 37.8085123],
    ]
    setMap(bbox);
  }, []);

  useEffect(() => {
    if(!map.current)
      return
    switch (mapButtonAction){
      case 'reset':
        map.current?.remove();
        setMap(map.current?.getBounds())
        setMapButtonAction('')
        break;
    }
  }, [mapButtonAction]);

  useEffect(() => {
    if(!map.current || !map.current?.getSource('geolab-layers')) return
    ['gas-pipe', 'gas-valve', 'gas-tb', 'gas-gauge'].map((layer)=>{
      layerTrigger(layer,'none')
    })
    if(!mapLayerView) return;
    Array.from(mapLayerViewList).map((layer)=>{
      layerTrigger(layer,'visible')
    })
  }, [mapLayerView,mapLayerViewList.size,pipelines,rglt, tbs, valves]);

  useEffect(() => {
    if (!map.current || !zoom) return;
    map.current?.zoomTo(zoom, { duration: 1000 });
  }, [zoom]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      {
        !mapLayerView|| <LayerBox/>
      }
    </MapContainer>
  );
};
