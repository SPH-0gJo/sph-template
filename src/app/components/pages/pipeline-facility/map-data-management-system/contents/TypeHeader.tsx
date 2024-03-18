import React from 'react';
import { GeoDataKeys } from 'shared/fixtures/pipeline';

interface TypeHeaderProps {
  layerGroupId: GeoDataKeys | undefined;
}

export const TypeHeader = (props: TypeHeaderProps) => {
  const { layerGroupId } = props;

  if (layerGroupId == 'pl') {
    return (
      <>
        <span>배관 ID</span>
        <span>유형</span>
        <span>압력</span>
        <span>재질</span>
        <span>연장</span>
      </>
    );
  }

  if (layerGroupId === 'vv') {
    return (
      <>
        <span>배관 ID</span>
        <span>유형</span>
        <span>압력</span>
        <span>형식</span>
        <span>각도</span>
      </>
    );
  }
  if (layerGroupId === 'tb') {
    return (
      <>
        <span>관리번호</span>
        <span>유형</span>
        <span>압력</span>
        <span>방식</span>
        <span>각도</span>
      </>
    );
  }

  if (layerGroupId === 'rglt') {
    return (
      <>
        <span>관리번호</span>
        <span>정압기명</span>
        <span>구분</span>
        <span>유형</span>
      </>
    );
  }
};
