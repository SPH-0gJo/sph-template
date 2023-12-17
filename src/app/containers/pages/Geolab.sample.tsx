import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import maplibregl, { Map, MapMouseEvent } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { circleColor, lineColor, tbCircleColor } from 'app/containers/pages/style.filter';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

const GeolabMap = styled.div`
  width: 100%;
  height: 100%;
`;

const AppMap = styled.div`
  width: 100%;
  height: 100%;
`;

export const GeolabSample = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [lng] = useState(127.0535312);
  const [lat] = useState(37.2893525);
  const [zoom] = useState(6);
  const [layerType] = useState('vector-tiles');

  useEffect(() => {
    console.log(faCameraRetro);
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current || '',
      hash: true,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=DifPnucmd6PF6UqDKcMm',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current?.on('load', () => {
      map.current?.loadImage('assets/images/img_1.png', (error, image) => {
        if (error) throw error;
        map.current?.addImage('shop-icon', image, { sdf: true });
        if (layerType === 'vector-tiles') addVectorTiles();
      });

      map.current?.fitBounds([
        [126.51718139648438, 35.9637451171875], // southwestern corner of the bounds
        [127.57186889648438, 36.98272705078125], // northeastern corner of the bounds
      ]);
    });
  }, [lng, lat, zoom]);

  // function addWMSLayers() {
  //   const obj = {
  //     SERVICE: 'WMS',
  //     VERSION: '1.1.1',
  //     REQUEST: 'GetMap',
  //     FORMAT: 'image/png',
  //     TRANSPARENT: 'true',
  //     LAYERS: 'geolab:GSF_PL_MT',
  //     exceptions: 'application/vnd.ogc.se_inimage',
  //     SRS: 'EPSG:4326',
  //     WIDTH: 768,
  //     HEIGHT: 742,
  //     BBOX: '126.51718139648438,35.9637451171875,127.57186889648438,36.98272705078125',
  //   };
  //
  //   const queryString = `?${new URLSearchParams(obj).toString()}`;
  //   const wmsReq = `http://localhost:8080/geoserver/geolab/wms${queryString}`;
  //
  //   map.current?.addSource('wms-test-source', {
  //     type: 'raster',
  //     tiles: [wmsReq],
  //     tileSize: 256,
  //   });
  //   map.current?.addLayer(
  //     {
  //       id: 'wms-test-layer',
  //       type: 'raster',
  //       source: 'wms-test-source',
  //       paint: {},
  //     },
  //     'building',
  //   );
  // }

  function addVectorTiles() {
    map.current?.addSource('geolab-layers', {
      type: 'vector',
      url: 'http://localhost:8081/data/pipeline_samples.json',
    });

    map.current?.addLayer({
      id: 'layer_001',
      type: 'line',
      source: 'geolab-layers',
      'source-layer': 'gsf_pl_mt',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': lineColor,
        'line-width': 2.5,
      },
    });

    map.current?.addLayer({
      id: 'layer_002',
      type: 'symbol',
      source: 'geolab-layers',
      'source-layer': 'gsf_vv_mt',
      layout: {
        'icon-image': 'shop-icon',
        'icon-size': 0.6,
      },
      paint: {
        'icon-color': circleColor,
        // 'circle-radius': 5,
      },
    });

    map.current?.addLayer({
      id: 'layer_003',
      type: 'circle',
      source: 'geolab-layers',
      'source-layer': 'gsf_tb_mt',
      paint: {
        'circle-color': tbCircleColor,
        'circle-radius': 5,
      },
    });

    map.current?.addLayer({
      id: 'layer_004',
      type: 'circle',
      source: 'geolab-layers',
      'source-layer': 'gsf_rglt_mt',
      paint: {
        'circle-color': '#0000ff',
        'circle-radius': 5,
      },
    });

    map.current?.on('mouseover', 'layer_002', (e: MapMouseEvent) => {
      console.log(e);
    });
  }

  return (
    <GeolabMap>
      <AppMap ref={mapContainer} />
    </GeolabMap>
  );
};
