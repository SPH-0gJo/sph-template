import React, { useEffect, useRef, useState } from 'react';
import { GeojsonUploadBox } from 'app/components/pages/file/geojson-upload/GeojsonUploadBox';
import { Map as AppMap } from 'maplibre-gl';
import { addVectorTiles } from 'shared/modules/gis/pipeline.vector.tiles';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 8fr 2fr;
`;

const MapViewerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const GeojsonUpload = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<AppMap | null>(null);
  const [mapFlag, setMapFlag] = useState<boolean>(false);

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
        addVectorTiles(map);
        return () => map.remove();
      });

      map.on('load', () => {
        setMapFlag(true);
      });
    }
  }, [map]);
  useEffect(() => {});

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer}></MapViewerWrapper>
      {mapFlag && <GeojsonUploadBox map={map}></GeojsonUploadBox>}
    </MapContainer>
  );
};
