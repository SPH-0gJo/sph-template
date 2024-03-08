import React, { useEffect, useRef, useState } from 'react';
import { GeojsonUploadBox } from 'app/components/pages/file/geojson-upload/GeojsonUploadBox';
import axios from 'axios';
import { Map as AppMap } from 'maplibre-gl';
import { GEOLAB_VECTOR_TILE_STYLE } from 'shared/constants/varibales';
import { makeRandomColor } from 'shared/modules/app.utils';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 8fr 2fr;
`;

const MapViewerWrapper = styled.div`
    width: 100%;: 1 0 %
`;

interface Layer {
  geometry: string;
  layer: string;
}

export const GeojsonUpload = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<AppMap | null>(null);
  const [mapFlag, setMapFlag] = useState<boolean>(false);
  const [colorMap, setColorMap] = useState<Map<string, string>>(new Map());

  const sourceCallback = () => {
    if (map?.getSource('geolab-layers') && map?.isSourceLoaded('geolab-layers')) {
      const tempMap = new Map();
      axios.get(GEOLAB_VECTOR_TILE_STYLE).then((response) => {
        response.data.tilestats.layers.forEach((layer: Layer) => {
          const color = makeRandomColor();
          tempMap.set(layer.layer, color);
          switch (layer.geometry) {
            case 'Point':
              map?.addLayer({
                id: layer.layer,
                type: 'circle',
                source: 'geolab-layers',
                'source-layer': layer.layer,
                paint: {
                  'circle-radius': 2,
                  'circle-color': color,
                },
              });
              break;
            case 'LineString':
              map?.addLayer({
                id: layer.layer,
                type: 'line',
                source: 'geolab-layers',
                'source-layer': layer.layer,
                paint: {
                  'line-color': color,
                },
              });
              break;
            default:
              map?.addLayer({
                id: layer.layer,
                type: 'fill',
                source: 'geolab-layers',
                'source-layer': layer.layer,
                paint: {
                  'fill-color': color,
                  'fill-opacity': 0.3,
                },
              });
              break;
          }
        });
        setColorMap(tempMap);
      });
      map.off('sourcedata', sourceCallback);
    }
  };

  useEffect(() => {
    if (map || !mapContainer) return;
    const container = mapContainer.current || '';
    setMap(initMap(container, 12, 2, undefined));
  }, []);

  useEffect(() => {
    if (map) {
      map.on('load', () => {
        map.fitBounds([
          [126.51718139648438, 35.9637451171875], // southwestern corner of the bounds
          [127.57186889648438, 36.98272705078125], // northeastern corner of the bounds
        ]);
        map.addSource('geolab-layers', { type: 'vector', url: GEOLAB_VECTOR_TILE_STYLE });
        map.on('sourcedata', sourceCallback);
        // addVectorTiles(map);
        return () => map.remove();
      });

      map.on('load', () => {
        setMapFlag(true);
      });
    }
  }, [map]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer}></MapViewerWrapper>
      {mapFlag && <GeojsonUploadBox colorMap={colorMap} map={map}></GeojsonUploadBox>}
    </MapContainer>
  );
};
