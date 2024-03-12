import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { Feature } from 'geojson';
import styled from 'styled-components';

interface PipeInfo {
  pipe_id: string;
  gis_pl_ty_cd: string;
  gis_pres_cd: string;
  gis_pl_div_cd: string;
  pl_mtrqlt_cd: string;
}

interface VirtualContentsProps {
  featureList: Array<Feature>;
  selectLayer: number;
  changeColor: (sourceId: string, feature: Feature) => void;
}

const Container = styled.div`
  width: 350px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .listWrapper {
    div {
      div:nth-child(odd) {
        background-color: var(--black-a4);
      }

      div {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        justify-items: center;
        align-items: center;
        width: 100%;

        &:hover {
          background-color: var(--black-a16);
        }

        &.highlight {
          background-color: var(--palette-red-400);
          border-radius: 0.5rem;
          color: var(--white-a100);
          font-weight: bold;
        }

        span {
          display: flex;
          justify-self: center;
          align-self: center;
        }
      }
    }
  }
`;

const CustomHeader = styled.div`
  width: 350px;
  height: 1rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  align-content: center;
  background-color: var(--light-secondary-origin);
  color: var(--white-a100);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

export const VirtualContents = (props: VirtualContentsProps) => {
  const listRef = useRef<List>(null);
  const { featureList, selectLayer, changeColor } = props;
  const [highlight, setHighlight] = useState<number>(-1);

  useEffect(() => {
    for (let i = 0; i < featureList.length; i++) {
      const currentObject: PipeInfo = featureList[i].properties as PipeInfo;
      if (currentObject.pipe_id === selectLayer.toString()) {
        setHighlight(i);
        break; // 원하는 object를 찾았으므로 반복문 종료
      }
    }
  }, [selectLayer]);

  useEffect(() => {
    highlight && listRef.current?.scrollToItem(highlight);
  }, [highlight]);

  useEffect(() => {
    setHighlight(-1);
  }, [featureList]);
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const info: PipeInfo = featureList[index]?.properties as PipeInfo;
    return (
      <div
        key={index}
        style={style}
        className={highlight === index ? 'highlight' : ''}
        onClick={() => {
          changeColor('pipes_ly', featureList[index]);
        }}
      >
        <span>
          {/* <ColorBar color={pipeList[index]?.gis_pl_ty_cd] || 'white'} />)*/}
          <span> {info?.pipe_id ? info.pipe_id : '-'}</span>
        </span>
        <span>{info?.gis_pl_ty_cd ? info.gis_pl_ty_cd : '-'}</span>
        <span>{info?.gis_pres_cd ? info.gis_pres_cd : '-'}</span>
        <span>{info?.gis_pl_div_cd ? info.gis_pl_div_cd : '-'}</span>
        <span>{info?.pl_mtrqlt_cd ? info.pl_mtrqlt_cd : '-'}</span>
      </div>
    );
  };
  return (
    <Container>
      <CustomHeader>
        <span>배관 ID</span>
        <span>유형</span>
        <span>압력</span>
        <span>재질</span>
        <span>연장</span>
      </CustomHeader>
      <AutoSizer>
        {({ width, height }) => (
          // container에 지정된 width와 height 을 전달해 줌
          <List
            className='listWrapper'
            ref={listRef}
            height={height}
            itemCount={featureList.length}
            itemSize={35}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </Container>
  );
};
