import React, { useEffect, useState } from 'react';
import { Button } from 'app/components/common-ui';
import { Map as AppMap } from 'maplibre-gl';
import {
  CircleDraw,
  GeolabCircleDraw,
  GeolabLineDraw,
  GeolabPolygonDraw,
  LineDraw,
  PolygonDraw,
} from 'shared/modules/gis/drawing';
import styled from 'styled-components';

const DrawingButtonWrapper = styled.div`
  background-color: var(--white);
  border-radius: 1rem;
  position: fixed;
  top: 7.625rem;
  left: 2rem;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
`;

const DrawingButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

interface DrawingControlData {
  appMap: AppMap | null;
}

interface DrawingControlProps {
  data: DrawingControlData;
}

let drawObj: GeolabPolygonDraw | GeolabLineDraw | GeolabCircleDraw | undefined;
export const DrawingControl = (props: DrawingControlProps) => {
  const [drawingType, setDrawingType] = useState<string | undefined>(undefined);
  const { appMap } = props.data;

  useEffect(() => {
    drawObj && drawObj.destroy();
    drawObj = undefined;
    if (!drawingType) return;
    if (drawingType === 'polygon') drawObj = PolygonDraw;
    else if (drawingType === 'line') drawObj = LineDraw;
    else drawObj = CircleDraw;
    drawObj.main({ map: appMap as AppMap });
  }, [drawingType]);

  function selectDrawingType(selectedType: string) {
    if (selectedType === drawingType) setDrawingType(undefined);
    else setDrawingType(selectedType);
  }

  return (
    <DrawingButtonWrapper>
      <DrawingButtons>
        <Button color={`${drawingType === 'polygon' ? 'dark' : 'light'}`} onClick={() => selectDrawingType('polygon')}>
          폴리곤
        </Button>
        <Button color={`${drawingType === 'line' ? 'dark' : 'light'}`} onClick={() => selectDrawingType('line')}>
          라인
        </Button>
        <Button color={`${drawingType === 'circle' ? 'dark' : 'light'}`} onClick={() => selectDrawingType('circle')}>
          원
        </Button>
      </DrawingButtons>
    </DrawingButtonWrapper>
  );
};
