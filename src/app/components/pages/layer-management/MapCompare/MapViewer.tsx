import React, { useEffect, useRef, useState } from 'react';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap } from 'maplibre-gl';
import { addVectorTiles } from 'shared/modules/gis/pipeline.vector.tiles';
import { getMapByWMS } from 'shared/modules/gis/pipeline.wms.getmap';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

import 'maplibre-gl/dist/maplibre-gl.css';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MapViewerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface MapViewerProps {
  data: {
    requestType: 'wms' | 'vector-tile';
  };
  num?: number;
  isMove?: number;
  setIsMove?: React.Dispatch<React.SetStateAction<number>>;
  curPosition?: Array<Array<number>>;
  setCurPosition?: React.Dispatch<React.SetStateAction<Array<Array<number>>>>;
}

export const MapViewer = (props: MapViewerProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<AppMap | null>(null);
  const { zoomLevel: zoom } = useMapOptionsStore();

  useEffect(() => {
    if (map.current || !mapContainer) return;
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 2, undefined);
    map.current.on('load', () => {
      map.current?.fitBounds([
        [126.51718139648438, 35.9637451171875], // southwestern corner of the bounds
        [127.57186889648438, 36.98272705078125], // northeastern corner of the bounds
      ]);
      props.data.requestType === 'wms'
        ? map.current && getMapByWMS(map.current)
        : map.current && addVectorTiles(map.current);
      return () => map.current?.remove();
    });
    map.current.on('moveend', () => {
      if (props.data.requestType === 'vector-tile') return;
      map.current && getMapByWMS(map.current);
    });
    map.current.dragRotate.disable();
    map.current.touchZoomRotate.disableRotation();
  }, [zoom]);

  useEffect(() => {
    if (map.current) {
      const onDrag = () => {
        if (props.setIsMove && props.num) {
          props.setIsMove(props.num);
        }
      };
      const onDragEnd = () => {
        if (props.setIsMove) {
          props.setIsMove(0);
        }
      };
      const dblclick = () => {
        if (props.setIsMove && props.num) {
          props.setIsMove(props.num);
        }
      };

      const wheel = () => {
        if (props.setIsMove && props.num) {
          props.setIsMove(props.num);
        }
      };
      const rotate = () => {
        if (props.setIsMove && props.num) {
          props.setIsMove(props.num);
        }
      };

      const move = () => {
        if (props.setCurPosition && map.current?.getBounds().toArray() && props.num && props.setIsMove) {
          // console.log(map.current?.getBounds().toArray());
          if (props.isMove === props.num) {
            props.setCurPosition(map.current?.getBounds().toArray());
          }
        }
      };

      if (props.isMove !== 0) {
        map.current.on('move', move);
      }
      map.current.on('rotate', rotate);
      map.current.on('wheel', wheel);
      map.current.on('drag', onDrag);
      map.current.on('dragend', onDragEnd);
      map.current.on('dblclick', dblclick);

      if (props.curPosition && props.curPosition.length === 2) {
        if (props.isMove !== props.num) {
          map.current?.fitBounds(
            [props.curPosition[0][0], props.curPosition[0][1], props.curPosition[1][0], props.curPosition[1][1]],
            { duration: 0 },
          );
        }
      }

      return () => {
        if (map.current) {
          map.current.off('rotate', rotate);
          map.current.off('wheel', wheel);
          map.current.off('drag', onDrag);
          map.current.off('dragend', onDragEnd);
          map.current.off('dblclick', dblclick);
          map.current.off('move', move);
        }
      };
    }
  }, [map, props.isMove, props.num, props.curPosition]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
    </MapContainer>
  );
};
