import React, { useEffect, useRef, useState } from 'react';
import { mobileApi } from 'app/api/mobile.api';
import { InfoBox } from 'app/components/pages/mobile-main/map/InfoBox';
import { LayerBox } from 'app/components/pages/mobile-main/map/LayerBox';
import { SearchView } from 'app/components/pages/mobile-main/map/Search/SearchView';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { useMobileMapStore } from 'app/stores/mobile/mobileMap';
import { LngLatBoundsLike, Map as AppMap } from 'maplibre-gl';
import { SvcRequest } from 'shared/constants/types/mobile/openapi';
import { OpenAPIKey } from 'shared/constants/varibales';
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
  const [curZoom, setCurZoom] = useState<number | undefined>(12);
  const map = useRef<AppMap | null>(null);
  const { zoomLevel: zoom } = useMapOptionsStore();
  const {
    mapButtonAction,
    setMapButtonAction,
    mapLayerView,
    mapLayerViewActiveList,
    mapInfoView,
    setMapInfoList,
    setRequestInfo,
    requestInfo,
    mapCenter,
    setMapCenter,
  } = useMobileMapStore();
  const setMap = (bounds: LngLatBoundsLike) => {
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 0, undefined);
    map.current.on('load', () => {
      map.current?.fitBounds(bounds);
      if (map.current) addVectorTilesMobile(map.current);
      map.current?.on('move', saveCoordinate);
    });
    return () => map.current?.remove();
  };
  useEffect(() => {
    if (map.current || !mapContainer) return;
    const bbox: LngLatBoundsLike = [
      [127.0396123, 36.3755123],
      [127.0396123, 36.9755123],
    ];
    setMap(bbox);
  }, []);
  useEffect(() => {
    if (!map.current || !zoom) return;
    map.current?.zoomTo(zoom, { duration: 1000 });
  }, [zoom]);
  const saveCoordinate = () => {
    const tempArray = map.current?.getCenter().toArray() as Array<number>;
    setMapCenter(tempArray);
  };
  useEffect(() => {
    if (mapCenter && typeof mapCenter[0] === 'string') {
      if (map.current) {
        map.current?.flyTo({
          center: [mapCenter[1], mapCenter[0]],
          zoom: 13,
        });
      }
    }
  }, [mapCenter]);
  useEffect(() => {
    const getInfo = async () => {
      if (mapInfoView && map.current) {
        if (map.current?.getZoom() > 12) {
          const vWorldResult = await mobileApi.vWorldApiRG(map.current?.getCenter().lat, map.current?.getCenter().lng);
          const request: SvcRequest = {
            serviceKey: OpenAPIKey,
            pageNo: '1',
            numOfRows: '999',
            viewType: 'json',
            BSI: vWorldResult[0],
            SIGUN: vWorldResult[1],
          };
          if (JSON.stringify(request) === JSON.stringify(requestInfo)) return;
          setRequestInfo(request);
          const result = await mobileApi.openApi(request);
          setMapInfoList(result.response.body.items);
        }
      }
    };
    const getZoom = () => {
      if (mapInfoView && map.current) {
        setCurZoom(map.current?.getZoom());
      }
    };
    if (mapInfoView) {
      map.current?.on('moveend', getInfo);
      map.current?.on('move', getZoom);
    } else {
      map.current?.off('moveend', getInfo);
      map.current?.off('move', getZoom);
    }
    return () => {
      if (map.current) {
        map.current.off('moveend', getInfo);
        map.current.off('move', getZoom);
      }
    };
  }, [mapInfoView, requestInfo]);
  const layerTrigger = (layer: string, visibility: string) => {
    switch (layer) {
      case 'gas-pipe':
        pipelines.map((val) => {
          map.current?.setLayoutProperty(`gsf_pl_mt_${val.code}`, 'visibility', visibility);
        });
        break;
      case 'gas-valve':
        valves.map((val) => {
          map.current?.setLayoutProperty(`gsf_vv_mt_${val.code}`, 'visibility', visibility);
        });
        break;
      case 'gas-tb':
        tbs.map((val) => {
          map.current?.setLayoutProperty(`gsf_tb_mt_${val.code}`, 'visibility', visibility);
        });
        break;
      case 'gas-gauge':
        rglt.map((val) => {
          map.current?.setLayoutProperty(`gsf_rglt_mt_${val.code}`, 'visibility', visibility);
        });
        break;
    }
  };
  useEffect(() => {
    if (!map.current || !map.current?.getSource('geolab-layers')) return;
    ['gas-pipe', 'gas-valve', 'gas-tb', 'gas-gauge'].map((layer) => {
      layerTrigger(layer, 'none');
    });
    if (!mapLayerView) return;
    Array.from(mapLayerViewActiveList).map((layer) => {
      layerTrigger(layer, 'visible');
    });
  }, [mapLayerView, mapLayerViewActiveList.size, pipelines, rglt, tbs, valves]);
  useEffect(() => {
    if (!map.current) return;
    switch (mapButtonAction) {
      case 'reset':
        map.current?.remove();
        setMap(map.current?.getBounds());
        setMapButtonAction('');
        break;
    }
  }, [mapButtonAction]);
  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      {!mapLayerView || <LayerBox />}
      {!mapInfoView || <InfoBox zoomLevel={curZoom} />}
      <SearchView />
    </MapContainer>
  );
};
