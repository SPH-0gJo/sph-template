import React, { CSSProperties } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components';

interface Info {
  pipe_id: string;
  gis_pl_ty_cd: string;
  gis_pres_cd: string;
  gis_pl_div_cd: string;
  pl_mtrqlt_cd: string;
}

interface VirtualContentsProps {
  pipeList: Array<Info>;
}

const Container = styled.div`
  width: 350px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CustomRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  &:hover {
    background-color: var(--black-a16);
  }
`;

const CustomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  gap: 10px;
  height: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--black-a12);
`;

export const VirtualContents = (props: VirtualContentsProps) => {
  const { pipeList } = props;
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <CustomRow key={index} style={style}>
      <span>
        {/* <ColorBar color={pipeList[index]?.gis_pl_ty_cd] || 'white'} />)*/}
        <span> {pipeList[index]?.pipe_id ? pipeList[index].pipe_id : '-'}</span>
      </span>
      <span>{pipeList[index]?.gis_pl_ty_cd ? pipeList[index].gis_pl_ty_cd : '-'}</span>
      <span>{pipeList[index]?.gis_pres_cd ? pipeList[index].gis_pres_cd : '-'}</span>
      <span>{pipeList[index]?.gis_pl_div_cd ? pipeList[index].gis_pl_div_cd : '-'}</span>
      <span>{pipeList[index]?.pl_mtrqlt_cd ? pipeList[index].pl_mtrqlt_cd : '-'}</span>
    </CustomRow>
  );
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
          <List height={height} itemCount={pipeList.length} itemSize={35} width={width}>
            {Row}
          </List>
        )}
      </AutoSizer>
    </Container>
  );
};
