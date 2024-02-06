import React, { useState } from 'react';
import { useMobileMapStore } from 'app/stores/mobile/mobileMap';
import { SvcResponse } from 'shared/constants/types/mobile/openapi';
import styled from 'styled-components';

const InfoBoxDetailWrap = styled.div`
  width: 100%;
  height: 14rem;
  background-color: white;
  bottom: 0;
  position: fixed;
  transition: all 0.5s;
  max-width: 1000%;
`

const InfoBoxDetailHeader = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: var(--dark-surface-level-2);
  bottom: 14rem;
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem 0 0.5rem;
  align-items: center;
  em{
    color: var(--white);
    font-size: 2rem;
  }
  span{
    color: var(--white);
  }
`

const InfoBoxInfoMain = styled.div`
  width: 100%;
  height: 14rem;
  background-color: white;
  bottom: 0;
  position: relative;
  vertical-align: top;
  white-space: nowrap;
  transition: all 0.5s;
`

const Slider = styled.table`
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.5s;
  display: inline-block; // 수정된 부분
  vertical-align: top;
  white-space: normal; // 수정된 부분
  tbody{
    height: 100%;
    display: inline-table;
    width: 100%;
    border-collapse: collapse;
    tr:nth-of-type(odd){
        background: var(--black-a12)
    }
  }
`

interface InfoBoxDetail{
  changeStyle:string;
}

export const InfoBoxDetail = (props :InfoBoxDetail) =>{
  const { mapInfoList } = useMobileMapStore()
  const [translateValue, setTranslateValue] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(1); // 페이지 번호 상태 추가
  const handleSlide = (direction: 'left' | 'right') => {
    const slideWidth = 100; // 변경하고 싶은 슬라이드의 가로 너비
    const totalSlides = mapInfoList.length;
    let newTranslateValue =
      direction === 'left'
        ? translateValue + slideWidth
        : translateValue - slideWidth;

    // 좌측 끝에서 더 이상 좌측으로 슬라이딩하지 못하도록
    if (newTranslateValue > 0) {
      newTranslateValue = 0;
    }
    // 우측 끝에서 더 이상 우측으로 슬라이딩하지 못하도록
    const maxTranslateValue = -((totalSlides - 1) * slideWidth);
    if (newTranslateValue < maxTranslateValue) {
      newTranslateValue = maxTranslateValue;
    }

    // 페이지 번호 갱신
    let newPageNum = pageNum;
    if (direction === 'left' && pageNum > 1) {
      newPageNum--;
    } else if (direction === 'right' && pageNum < totalSlides) {
      newPageNum++;
    }

    setPageNum(newPageNum);

    setTranslateValue(newTranslateValue);
  };

  return(
    <InfoBoxDetailWrap style={{transform:props.changeStyle}}>
      <InfoBoxDetailHeader>
        <em className="icon-chevron-left" onClick={()=>handleSlide('left')} style={{ color:pageNum === 1 ? 'gray':'' }} />
        <span>{mapInfoList[`${pageNum-1}`]?.WILO_NAM} ({pageNum}/{mapInfoList.length}) </span>
        <em className="icon-chevron-right" onClick={()=>handleSlide('right')} style={{ color:pageNum === mapInfoList.length ? 'gray':'' }}/>
      </InfoBoxDetailHeader>
      <InfoBoxInfoMain style={{transform:`translateX(${translateValue}%)`}}>
        {mapInfoList.map((info: SvcResponse, key: number)=>{
          return(
              <Slider key={key}>
                <tbody>
                   <tr>
                   <th>수도구분</th>
                  <td>{info.WILO_NAM}</td>
                  </tr>
                   <tr>
                   <th>수도사업자</th>
                  <td>{info.WBIZ_NAM}</td>
                  </tr>
                   <tr>
                   <th>취수장명</th>
                  <td>{info.FCLT_NAM}</td>
                  </tr>
                   <tr>
                   <th>취수장주소</th>
                  <td>{info.DTL_ADR}</td>
                  </tr>
                   <tr>
                   <th>대표수계</th>
                  <td>{info.WSYS_NM}</td>
                  </tr>
                   <tr>
                   <th>수원 (취수원형태)</th>
                  <td>{info.WSRC_NM}</td>
                  </tr>
                   <tr>
                     <th>전화번호</th>
                     <td>{info.PHONE_NUM}</td>
                  </tr>
                   <tr>
                     <th>준공일</th>
                     <td>{info.COMPL_DAT}</td>
                  </tr>
                   <tr>
                     <th>시설용량 (㎥/일)</th>
                     <td>{info.FCLT_VOL}</td>
                  </tr>
                </tbody>
              </Slider>
            )
          })}
      </InfoBoxInfoMain>
    </InfoBoxDetailWrap>
  )
}