import React from 'react';
import { GeoDataKeys } from 'shared/fixtures/pipeline';

interface TypeHeaderProps {
  layerGroupId: GeoDataKeys | undefined;
}

export const TypeHeader = (props: TypeHeaderProps) => {
  const { layerGroupId } = props;

  return (
    <>
      <span>배관 ID</span>
      <span>유형</span>
      <span>압력</span>
      {layerGroupId === 'pl' ? (
        <>
          <span>재질</span>
          <span>연장</span>
        </>
      ) : (
        <>
          <span>형식</span>
          <span>각도</span>
        </>
      )}
    </>
  );
};
