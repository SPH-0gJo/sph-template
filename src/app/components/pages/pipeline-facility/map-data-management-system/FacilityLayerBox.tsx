import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'app/components/common-ui';
import { GovernorContents } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/GovernorContents';
import { InfoContent } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/InfoContents';
import { PipeContents } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/PipeContents';
import { TestBoxContents } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/TestBoxContents';
import { ValveContents } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/ValveContents';
import { OptionBox } from 'app/components/pages/pipeline-facility/map-data-management-system/OptionBox';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import axios from 'axios';
import { Feature } from 'geojson';
import { LngLatBounds, Map as AppMap } from 'maplibre-gl';
import { GeoDataKeys } from 'shared/fixtures/pipeline';
import styled from 'styled-components';

interface LayerBoxProps {
  $visible: boolean;
}

const SearchWrapper = styled.div`
  display: flex;
  width: 25.625rem;
  flex-direction: row;
  flex-shrink: 0;
  gap: 0.9375rem;
  border-radius: 0.625rem;
  background: var(--white);
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 7.25rem;
  left: 1.25rem;
  user-select: none;

  padding: 0.25rem 0.25rem 0.25rem 1.25rem;
  //gap: 0.25rem;
`;

const SearchInput = styled.input`
  border: none;
  width: 20rem;
  padding-left: 1rem;
`;

const LayerBoxWrapper = styled.div<LayerBoxProps>`
  display: flex;
  width: 25.625rem;
  flex-direction: column;
  flex-shrink: 0;
  gap: 0.9375rem;
  border-radius: 0.625rem;
  background: var(--white);
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 12.25rem;
  left: 1.25rem;
  user-select: none;
  padding-bottom: ${(props) => (props.$visible ? '0' : '1.87rem')};
`;

const LayerBoxHeader = styled.div<LayerBoxProps>`
  display: flex;
  padding: 0.9375rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => (props.$visible ? '0' : '1px solid var(--divider, rgba(0, 0, 0, 0.12))')};

  em {
    margin-left: auto;
    font-size: 1.5rem;
    transform: rotate(-90deg);
    cursor: pointer;
  }
`;
const LayerBoxTitle = styled.div`
  display: flex;
  width: 23.5rem;
  justify-content: space-between;
  align-items: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  width: 25.625rem;
  height: 40.5625rem;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;
const LayerGroupButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
const LayerGroupButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  color: var(--black);
  font-size: 0.875rem;
  font-weight: var(--text-weight-bold);
  border: 0;
  border-radius: 0.375rem;
  background-color: var(--white);

  em {
    font-size: 1.125rem;
  }

  &.selected {
    color: var(--white);
    background-color: var(--light-secondary-origin);
  }

  &:hover {
    color: var(--black);
    background: var(--light-secondary-a16);
  }
`;

interface GSFLayerBoxData {
  appMap: AppMap | null;
}

interface GSFLayerBoxProps {
  data: GSFLayerBoxData;
}

export const FacilityLayerBox = (props: GSFLayerBoxProps) => {
  const [layerGroupId, setLayerGroupId] = useState<GeoDataKeys | undefined>();
  const [contentList, setContentList] = useState<Array<Feature>>([]);
  const [visible, setVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [currentZoomLevel, setZoomLevel] = useState<number | undefined>(0);
  const { gsfLayerGroups } = useGsfLayerStore();
  useEffect(() => {
    setLayerGroupId('pl');
  }, []);

  useEffect(() => {
    getFeatures();
  }, [layerGroupId]);
  const getFeatures = async () => {
    const zoomLevel: number | undefined = props.data.appMap?.getZoom();
    setZoomLevel(zoomLevel);

    console.log(zoomLevel);
    if (zoomLevel == undefined || zoomLevel < 13) {
      setShowInfo(true);
      return;
    }
    setShowInfo(false);

    const bounds: LngLatBounds | undefined = props.data.appMap?.getBounds();
    if (!bounds) return;

    const ne = bounds.getNorthEast(); // 북동쪽 좌표
    const sw = bounds.getSouthWest(); // 남서쪽 좌표
    const bbox = `${sw.lat},${sw.lng},${ne.lat},${ne.lng}`;
    // bbox 요청 임시 (api 로 변경 예정)
    const WFS_URL = 'https://geo.sphinfo.co.kr/geoserver/geolab/wfs';
    const WFS_VERSION = 'version=2.0.0';
    const REQUEST = 'request=GetFeature';
    const TYPE_NAME = {
      pl: 'typeName=geolab:GSF_PL_MT',
      vv: 'typeName=geolab:GSF_VV_MT',
      tb: 'typeName=geolab:GSF_TB_MT',
      rglt: 'typeName=geolab:GSF_RGLT_MT',
    };

    const url = `${WFS_URL}?service=WFS&${WFS_VERSION}&${REQUEST}&${
      TYPE_NAME[layerGroupId as GeoDataKeys]
    }&bbox=${bbox}&outputFormat=application/json`;

    try {
      console.log(bbox);
      console.log(url);
      const response = await axios.get(url);
      setContentList(response.data.features);
    } catch (error) {
      console.error('에러', error);
    }
  };

  const layerGroups = useMemo(() => {
    if (!gsfLayerGroups) return;
    return [
      { name: '배관', layerId: 'gsf_pl_mt', key: 'pl', icon: 'gas-pipe' },
      { name: '밸브', layerId: 'gsf_vv_mt', key: 'vv', icon: 'gas-valve' },
      { name: 'TB', layerId: 'gsf_tb_mt', key: 'tb', icon: 'gas-tb' },
      { name: '정압기', layerId: 'gsf_rglt_mt', key: 'rglt', icon: 'gas-gauge' },
    ];
  }, [gsfLayerGroups]);

  return (
    <>
      <SearchWrapper>
        <SearchInput></SearchInput>
        <Button onClick={getFeatures}> 검색</Button>
      </SearchWrapper>

      <LayerBoxWrapper $visible={visible}>
        <LayerBoxHeader $visible={visible}>
          <LayerGroupButtons>
            {layerGroups &&
              layerGroups.map((group) => {
                const { key, layerId, name, icon } = group;
                return (
                  <LayerGroupButton
                    className={layerGroupId === key ? 'selected' : ''}
                    key={layerId}
                    onClick={() => {
                      setLayerGroupId(key as GeoDataKeys);
                    }}
                  >
                    <em className={`icon-${icon}`} />
                    <span>{name}</span>
                  </LayerGroupButton>
                );
              })}
          </LayerGroupButtons>
          <em className={`icon-chevron-${visible ? 'left' : 'right'}-large`} onClick={() => setVisible(!visible)} />
        </LayerBoxHeader>
        <ContentWrapper>
          <LayerBoxTitle>
            {!showInfo && (
              <>
                <span>리스트</span>
                <span>{contentList.length}개</span>
              </>
            )}
          </LayerBoxTitle>
          {!visible && showInfo && <InfoContent zoomLevel={currentZoomLevel} />}
          {!visible && !showInfo && layerGroupId === 'pl' && <PipeContents contentList={contentList} />}
          {!visible && !showInfo && layerGroupId === 'vv' && <ValveContents contentList={contentList} />}
          {!visible && !showInfo && layerGroupId === 'tb' && <TestBoxContents contentList={contentList} />}
          {!visible && !showInfo && layerGroupId === 'rglt' && <GovernorContents contentList={contentList} />}
        </ContentWrapper>
      </LayerBoxWrapper>
      <OptionBox layerGroupId={layerGroupId} />
    </>
  );
};
