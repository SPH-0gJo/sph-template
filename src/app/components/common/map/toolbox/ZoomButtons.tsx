import React, { useEffect } from 'react';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap } from 'maplibre-gl';
import { ToolboxButton, ToolboxButtonWrapper } from 'shared/styles/styled/common';

interface ZoomButtonData {
  appMap: AppMap | null;
}

interface ZoomButtonProps {
  data: ZoomButtonData;
}

export const ZoomButtons = (props: ZoomButtonProps) => {
  const { zoomLevel: zoom, setZoom, setZoomLevel } = useMapOptionsStore();
  const { appMap } = props.data;

  useEffect(() => {
    if (!appMap) return;
    appMap.on('zoomend', (e) => {
      const currentZoom = e.target.getZoom();
      setZoom(currentZoom);
    });
  }, [appMap]);

  useEffect(() => {
    if (!appMap || !zoom) return;
    const currentZoom = appMap.getZoom();
    if (zoom === currentZoom) return;
    appMap.zoomTo(zoom, { duration: 1000 });
  }, [zoom]);

  return (
    <ToolboxButtonWrapper>
      <ToolboxButton name='초기화'>
        <em className='icon-map-position' />
      </ToolboxButton>
      <ToolboxButton onClick={() => setZoomLevel(1)} name='확대'>
        <em className='icon-plus' />
      </ToolboxButton>
      <ToolboxButton onClick={() => setZoomLevel(-1)} name='축소'>
        <em className='icon-minus' />
      </ToolboxButton>
    </ToolboxButtonWrapper>
  );
};
