import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { TypeHeader } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/TypeHeader';
import { TypeRow } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/TypeRow';
import { Feature } from 'geojson';
import { GeoDataKeys } from 'shared/fixtures/pipeline';
import styled from 'styled-components';

interface VirtualContentsProps {
  featureList: Array<Feature>;
  selectLayer: number;
  changeColor: (feature: Feature, layerGroupId: GeoDataKeys) => void;
  layerGroupId: GeoDataKeys | undefined;
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
  const { featureList, selectLayer, changeColor, layerGroupId } = props;
  const [highlight, setHighlight] = useState<number>(-1);

  useEffect(() => {
    for (let i = 0; i < featureList.length; i++) {
      let id;
      switch (layerGroupId) {
        case 'pl':
          id = featureList[i].properties?.pipe_id;
          break;
        case 'vv':
          id = featureList[i].properties?.vv_no;
          break;
        case 'tb':
          id = featureList[i].properties?.tb_mngno;
          break;
        case 'rglt':
          id = featureList[i].properties?.rglt_mngno;
          break;
      }
      if (id) {
        if (id.toString() === selectLayer.toString()) {
          setHighlight(i);
          break;
        }
      }
    }
  }, [selectLayer]);

  useEffect(() => {
    highlight && listRef.current?.scrollToItem(highlight);
  }, [highlight]);

  useEffect(() => {
    setHighlight(-1);
    listRef.current?.scrollToItem(0);
  }, [featureList]);
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const info = featureList[index]?.properties;
    return (
      <div
        key={index}
        style={style}
        className={highlight === index ? 'highlight' : ''}
        onClick={() => {
          layerGroupId && changeColor(featureList[index], layerGroupId);
        }}
      >
        <TypeRow info={info} layerGroupId={layerGroupId} />
      </div>
    );
  };
  return (
    <Container>
      <div>
        <span>리스트 : </span>
        <span> {featureList.length}</span>
      </div>
      <CustomHeader>
        <TypeHeader layerGroupId={layerGroupId} />
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
