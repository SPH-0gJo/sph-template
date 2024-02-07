import React, { useEffect, useState } from 'react';
import { InfoBoxDetail } from 'app/components/pages/mobile-main/map/Detail/InfoBoxDetail';
import { useMobileMapStore } from 'app/stores/mobile/mobileMap';
import styled from 'styled-components';

const InfoBoxWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 6rem;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    overflow: hidden;
    align-items: center;
    justify-content: center;
`;

const InfoBoxButton = styled.div`
    background-color: var(--dark-surface-level-2);
    border-radius: 0.625rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 12rem;
    height: 2rem;
    position: fixed;
    bottom: 2rem;
    transition: all 0.5s;
    overflow: hidden;
    
    button{
        align-self: center;
        border: none;
        background-color: transparent;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--white);
    }
    em {
        font-size: 1.5rem;
        color: var(--white);
    }

    span {
        color: var(--white);
    }
`;

interface InfoBoxProps{
  zoomLevel : number | undefined;
}

export const InfoBox = (props:InfoBoxProps) => {
  const { mapInfoList, requestInfo } = useMobileMapStore()
  const [detailOpen, setDetailOpen] = useState<boolean>(false)

  const transformButton = detailOpen ? 'translateY(-15rem)' : '';
  const transformButtonWidth = detailOpen ? '6rem' : '12rem';
  const transformDetail = detailOpen ? '' : 'translateY(23rem)';

  const openDetail = (flag = true) => {
    if(!flag){
      setDetailOpen(false)
      return
    }
    if(mapInfoList.length<1){
      setDetailOpen(false)
    }else{
      setDetailOpen(!detailOpen)
    }
  }
  useEffect(() => {
    if(props.zoomLevel && props.zoomLevel<=12){
      openDetail(false)
    }
  }, [props.zoomLevel]);
  return (
    <InfoBoxWrapper style={{opacity:props.zoomLevel?props.zoomLevel<=12?0.5:1:1}}>
      <InfoBoxButton onClick={() => {
        if(props.zoomLevel) if(props.zoomLevel<=12) return
          openDetail()
        }} style={{ transform: transformButton, width:transformButtonWidth }}>
          {
            detailOpen ?
              <button>
                메뉴 닫기 <em className="icon-chevron-down"></em>
              </button>
              :
             <button>{mapInfoList.length<1?'정보없음':`${requestInfo.BSI} ${requestInfo.SIGUN} (${mapInfoList.length})`}</button>
         }
      </InfoBoxButton>
      <InfoBoxDetail changeStyle={transformDetail} />
    </InfoBoxWrapper>
  )
}

