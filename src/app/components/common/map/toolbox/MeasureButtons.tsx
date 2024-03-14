import React, { useEffect, useState } from 'react';
import { Button } from 'app/components/common-ui';
import { useMapMeasureStore } from 'app/stores/mapMeasure';
import { Map as AppMap } from 'maplibre-gl';
import { MeasureTypes } from 'shared/constants/types/types';
import {
  CircleDraw,
  GeolabCircleDraw,
  GeolabLineDraw,
  GeolabPolygonDraw,
  LineDraw,
  PolygonDraw,
} from 'shared/modules/gis/drawing';
import { ToolboxButton, ToolboxButtonWrapper } from 'shared/styles/styled/common';
import styled from 'styled-components';

interface StyledProps {
  $position: number[] | undefined;
}

const CalculationBox = styled.div<StyledProps>`
  position: fixed;
  top: ${(props) => (props.$position ? `${props.$position[0]}px` : 0)};
  right: ${(props) => (props.$position ? `${props.$position[1]}px` : 0)};
  border-radius: 0.3rem;
  padding: 1rem;
  width: auto;
  height: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--light-surface-level-0);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
  p > span {
    margin: 0 0.1rem;
  }
`;

interface MeasureButtonData {
  appMap: AppMap | null;
}

interface MeasureButtonProps {
  data: MeasureButtonData;
}

export const MeasureButtons = (props: MeasureButtonProps) => {
  const { appMap } = props.data;
  const [width, setWidth] = useState(window.innerWidth - (window.innerWidth - 55));
  const [calculationBoxPosition, setCalculationBoxPosition] = useState<number[] | undefined>(undefined);
  const [measureSum, setMeasureSum] = useState(0);
  const [measureUnit, setMeasureUnit] = useState('');
  const [drawTool, setMeasureTool] = useState<GeolabLineDraw | GeolabPolygonDraw | GeolabCircleDraw | undefined>(
    undefined,
  );

  const { measureType, distanceValue, areaValue, setMeasureType } = useMapMeasureStore();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - (window.innerWidth - 55));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      drawTool && drawTool.destroy();
      setMeasureType('none');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    drawTool && drawTool.destroy();
    if (!measureType || measureType === 'none') {
      setMeasureTool(undefined);
      return;
    }
    const drawTools = {
      radius: CircleDraw,
      area: PolygonDraw,
      distance: LineDraw,
    };
    const tool = drawTools[measureType];
    setMeasureTool(tool);
  }, [measureType]);

  useEffect(() => {
    if (measureType === 'none' || !calculationBoxPosition) return;
    setCalculationBoxPosition([calculationBoxPosition[0], width]);
  }, [width]);

  useEffect(() => {
    getMeasureValue();
    const unitFunc: { [key: string]: string } = {
      none: '',
      radius: '',
      distance: 'km',
      area: 'km²',
    };
    setMeasureUnit(unitFunc[measureType]);
  }, [distanceValue, areaValue, measureType]);

  useEffect(() => {
    if (!drawTool) return;
    const callback = () => {
      const measured =
        measureType === 'area' ? (drawTool as GeolabPolygonDraw).getArea() : (drawTool as GeolabLineDraw).getDistance();
      setMeasureSum(measured);
    };
    drawTool.main({ map: appMap, callback });
  }, [drawTool]);

  function getMeasureValue() {
    let value = 0;
    if (measureType === 'distance') {
      distanceValue.forEach((n) => (value += n));
    } else if (measureType === 'area') {
      value = areaValue;
    }
    setMeasureSum(value);
  }

  return (
    <>
      <ToolboxButtonWrapper>
        {[
          ['radius', '반경', 'icon-map-circle'],
          ['distance', '거리', 'icon-map-ruler'],
          ['area', '면적', 'icon-map-polygon'],
        ].map((e, index) => {
          const [code, codeName, icon] = e;
          return (
            <ToolboxButton
              className={`${measureType === code ? 'selected' : ''}`}
              onClick={(e) => {
                if (!e.currentTarget || code === 'none') return;
                const { top } = e.currentTarget.getBoundingClientRect();
                setCalculationBoxPosition([top, width]);
                setMeasureType(code as MeasureTypes);
              }}
              name={codeName}
              key={`measure_button_${index}`}
            >
              <em className={icon} />
            </ToolboxButton>
          );
        })}
      </ToolboxButtonWrapper>
      {measureSum !== 0 && measureType !== 'none' && (
        <CalculationBox className='body' $position={calculationBoxPosition}>
          <p>
            <span>
              {measureType === 'area'
                ? (measureSum / 1000).toLocaleString('ko-KR')
                : measureSum.toLocaleString('ko-KR')}
            </span>
            <span>{measureUnit}</span>
          </p>
          <Button size='xs' color='secondary' onClick={() => {}}>
            초기화
          </Button>
        </CalculationBox>
      )}
    </>
  );
};
