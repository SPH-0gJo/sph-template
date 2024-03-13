import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'app/components/common-ui';
import { InfoContent } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/InfoContents';
// import { GovernorContents } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/GovernorContents';
// import { InfoContent } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/InfoContents';
// import { PipeContents } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/PipeContents';
// import { TestBoxContents } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/TestBoxContents';
// import { ValveContents } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/ValveContents';
import { VirtualContents } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/VirtualContents';
import { OptionBox } from 'app/components/pages/pipeline-facility/map-data-management-system/OptionBox';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { useLoadingStore } from 'app/stores/loading';
import axios from 'axios';
import { Feature } from 'geojson';
import maplibregl, { LngLatBounds, Map as AppMap } from 'maplibre-gl';
import { DefaultStyleByType } from 'shared/constants/types/GisInfoType';
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

const LoadButton = styled.button`
  position: absolute;
  border: none;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  background-color: var(--white-a100);
  border-radius: 0.625rem;
  width: 10rem;
  height: 2rem;
  bottom: 5rem;
  left: calc(50% - 5rem);
  display: flex;
  justify-content: center;
  align-items: center;
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
  // const [contentList, setContentList] = useState<Array<Feature>>([]);
  const [featureList, setFeatureList] = useState<Array<Feature>>([]);
  const [visible, setVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [currentZoomLevel, setZoomLevel] = useState<number | undefined>(0);
  const { gsfLayerGroups } = useGsfLayerStore();
  const { setLoading } = useLoadingStore();
  const [firstEvent, setFirstEvent] = useState<boolean>(true);
  const [selectLayer, setSelectLayer] = useState<number>(0);

  useEffect(() => {
    setLayerGroupId('pl');
  }, []);

  useEffect(() => {
    if (props.data.appMap && firstEvent) {
      props.data.appMap?.on('zoom', () => {
        const zoomLevel: number = props.data.appMap?.getZoom() as number;
        setZoomLevel(parseInt(zoomLevel.toString()));
      });
      setFirstEvent(false);
    }
  }, [props.data.appMap]);

  useEffect(() => {
    getFeatures();
  }, [layerGroupId]);
  const getFeatures = async () => {
    setLoading(true);
    setSelectLayer(-1);

    if (currentZoomLevel == undefined || currentZoomLevel < 13) {
      setShowInfo(true);
      setLoading(false);
      return;
    }
    setShowInfo(false);

    const bounds: LngLatBounds | undefined = props.data.appMap?.getBounds();
    if (!bounds) return;

    const ne = bounds.getNorthEast(); // 북동쪽 좌표
    const sw = bounds.getSouthWest(); // 남서쪽 좌표
    const bbox = `${sw.lat},${sw.lng},${ne.lat},${ne.lng}`;

    let forUrlId = 'pipes';
    switch (layerGroupId) {
      case 'pl':
        forUrlId = 'pipes';
        break;
      case 'vv':
        forUrlId = 'valves';
        break;
      case 'tb':
        forUrlId = 'tb';
        break;
      case 'rglt':
        forUrlId = 'rglt';
        break;
    }

    ['pl', 'vv', 'tb', 'rglt'].forEach((type: string) => {
      props.data.appMap?.getSource(type) &&
        props.data.appMap?.removeLayer(`${type}_ly`) &&
        props.data.appMap?.removeSource(type);
    });

    const url = `/geolab/api/v1/${forUrlId}?bbox=${bbox}`;
    try {
      await axios.get(url).then((res) => {
        const data = JSON.parse(res.data.geojson_data);

        if (!data.features) {
          setFeatureList([]);
          return;
        }
        if (!layerGroupId) return;
        props.data.appMap?.addSource(layerGroupId, { type: 'geojson', data: data });
        props.data.appMap?.addLayer(DefaultStyleByType(layerGroupId));
        props.data.appMap?.on('click', `${layerGroupId}_ly`, (e) => {
          e.preventDefault();

          if (e.features) {
            changeColor(e.features[0], layerGroupId);
          }
        });
        setFeatureList(data.features);
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('에러', error);
    }
  };

  const changeColor = (feature: Feature, layerGroupId: GeoDataKeys) => {
    const id = layerGroupId === 'pl' ? 'pipe_id' : 'vv' ? 'vv_no' : '';
    const propertyName = layerGroupId === 'pl' ? 'line-color' : 'vv' ? 'circle-color' : '';
    if (!feature.properties) return;
    props.data.appMap?.setPaintProperty(`${layerGroupId}_ly`, propertyName, [
      'case',
      ['==', ['get', id], feature.properties[`${id}`]],
      '#EE6D6DFF',
      '#808080',
    ]);
    setSelectLayer(feature.properties[`${id}`]);
    zoomToLayer(feature, layerGroupId);
  };

  const zoomToLayer = (feature: Feature, layerGroupId: GeoDataKeys | undefined) => {
    if ('coordinates' in feature.geometry) {
      const coordinates: number[][] = feature.geometry.coordinates as number[][];

      if (layerGroupId === ('pl' as GeoDataKeys)) {
        let minLng = coordinates[0][0];
        let minLat = coordinates[0][1];
        let maxLng = coordinates[0][0];
        let maxLat = coordinates[0][1];

        coordinates.forEach((coord) => {
          const lng = coord[0];
          const lat = coord[1];
          minLng = Math.min(minLng, lng);
          minLat = Math.min(minLat, lat);
          maxLng = Math.max(maxLng, lng);
          maxLat = Math.max(maxLat, lat);
        });

        // 경계 상자 생성
        const sw = new maplibregl.LngLat(minLng, minLat);
        const ne = new maplibregl.LngLat(maxLng, maxLat);

        props.data.appMap?.fitBounds(new maplibregl.LngLatBounds(sw, ne), {
          padding: 300,
        });
      } else {
        const lng: number = coordinates[0] as unknown as number;
        const lat: number = coordinates[1] as unknown as number;
        props.data.appMap?.fitBounds(new maplibregl.LngLatBounds([lng, lat], [lng, lat]), {
          padding: 300,
        });
      }
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
                <span>{featureList.length}개</span>
              </>
            )}
          </LayerBoxTitle>
          {/* {!visible && !showInfo && layerGroupId === 'pl' && <PipeContents contentList={contentList} />}*/}
          {/* {!visible && !showInfo && layerGroupId === 'vv' && <ValveContents contentList={contentList} />}*/}
          {/* {!visible && !showInfo && layerGroupId === 'tb' && <TestBoxContents contentList={contentList} />}*/}
          {/* {!visible && !showInfo && layerGroupId === 'rglt' && <GovernorContents contentList={contentList} />}*/}
          {!visible && showInfo ? (
            <InfoContent zoomLevel={currentZoomLevel} />
          ) : (
            <VirtualContents
              featureList={featureList}
              selectLayer={selectLayer}
              changeColor={changeColor}
              layerGroupId={layerGroupId}
            />
          )}
        </ContentWrapper>
      </LayerBoxWrapper>
      <OptionBox layerGroupId={layerGroupId} />
      <LoadButton onClick={getFeatures}>
        <h6>현재 지도 재검색</h6>
      </LoadButton>
    </>
  );
};
