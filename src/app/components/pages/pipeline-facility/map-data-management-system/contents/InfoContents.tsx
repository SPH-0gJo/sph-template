import React from 'react';
import styled from 'styled-components';


const LayerBoxContents = styled.div`
    user-select: none;
    overflow-y: auto;
    overflow-x: hidden;
    height: 30rem;
    display: flex;
    padding: 0rem 0.9375rem;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;

    p {
        text-align: center;
    }

`;

interface infoContentProps {
  zoomLevel: number | undefined;
}

export const InfoContent = (props: infoContentProps) => {

  return (
    <LayerBoxContents>
      <p> 지도를 축소해 주세요. <br />
        줌 레벨 <b>14</b> 이상 부터 확인 가능합니다</p>
      <p>현재 줌레벨</p>
      <p>{props.zoomLevel}</p>
    </LayerBoxContents>
  );
};
