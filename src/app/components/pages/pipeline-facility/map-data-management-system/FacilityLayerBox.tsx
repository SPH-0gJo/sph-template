import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'app/components/common-ui';
import { InfoContent } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/InfoContents';
import { VirtualContents } from 'app/components/pages/pipeline-facility/map-data-management-system/contents/VirtualContents';
import { OptionBox } from 'app/components/pages/pipeline-facility/map-data-management-system/OptionBox';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { useLoadingStore } from 'app/stores/loading';
import axios from 'axios';
import { Feature, FeatureCollection } from 'geojson';
import maplibregl, { Map as AppMap, Source } from 'maplibre-gl';
import { DefaultStyleByType } from 'shared/constants/types/GisInfoType';
import { GeoDataKeys } from 'shared/fixtures/pipeline';
import styled from 'styled-components';
import * as turf from 'turf';

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

`;

interface GSFLayerBoxData {
  appMap: AppMap | null;
}

interface GSFLayerBoxProps {
  data: GSFLayerBoxData;
}

interface ExtendedSource extends Source {
  _data: FeatureCollection;
}

export const FacilityLayerBox = (props: GSFLayerBoxProps) => {
  const [layerGroupId, setLayerGroupId] = useState<GeoDataKeys>('pl');
  const [plList, setPlList] = useState<Array<Feature>>([]);
  const [vvList, setVvList] = useState<Array<Feature>>([]);
  const [tbList, setTbList] = useState<Array<Feature>>([]);
  const [rgltList, setRgltList] = useState<Array<Feature>>([]);
  const [featureList, setFeatureList] = useState<Array<Feature>>([]);
  const [visible, setVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const { gsfLayerGroups } = useGsfLayerStore();
  const { setLoading } = useLoadingStore();
  const [selectLayer, setSelectLayer] = useState<number>(0);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [drawFlag, setDrawFlag] = useState<boolean>(false);
  const layerGorup: GeoDataKeys[] = ['pl', 'vv'];

  const setList: { [key: string]: (list: Array<Feature>) => void } = {
    pl: (list) => setPlList(list),
    vv: (list) => setVvList(list),
    tb: (list) => setTbList(list),
    rglt: (list) => setRgltList(list),
  };

  const getList: { [key: string]: Array<Feature> } = {
    pl: plList,
    vv: vvList,
    tb: tbList,
    rglt: rgltList,
  };

  useEffect(() => {
    if (!firstLoad) return;
    drawFlag && getDrawResult();
    setSelectLayer(0);
    // firstLoad && setFeatureList(getList[layerGroupId]);
  }, [layerGroupId, firstLoad, drawFlag]);

  useEffect(() => {
    if (!props.data.appMap) return;
    const requests = layerGorup.map((layer) => getFeatures(layer));

    setLoading(true);

    Promise.all(requests)
      .then((res) => {
        res.forEach((obj) => {
          obj && setList[`${Object.keys(obj)[0]}`](obj[`${Object.keys(obj)[0]}`].features);
        });
        setShowInfo(false);
        setLoading(false);
        setFirstLoad(true);
      })
      .catch(() => {
        setShowInfo(false);
        setLoading(false);
        setFirstLoad(true);
      });
  }, [props.data.appMap]);

  const getDrawResult = () => {
    const source = props.data.appMap?.getSource(layerGroupId) as ExtendedSource;
    const searchWithin = turf.polygon([
      [
        [127.12452249389491, 36.831057796119964],
        [127.1466025184672, 36.823399114454986],
        [127.13924251027646, 36.80819730671908],
        [127.09493526096645, 36.816328881755],
        [127.12452249389491, 36.831057796119964],
      ],
    ]);
    layerGorup.forEach((layerNm) => {
      props.data.appMap?.getSource(`${layerNm}_intersect`) &&
        props.data.appMap?.removeLayer(`${layerNm}_intersect_ly`) &&
        props.data.appMap?.removeSource(`${layerNm}_intersect`);
    });
    const intersections = source._data.features
      .map((feature) => {
        const intersected = turf.intersect(feature, searchWithin);
        if (intersected) {
          intersected.properties = feature.properties;
          return intersected;
        }
      })
      .filter(Boolean);

    if (intersections) {
      const newLayerId = `${layerGroupId}_intersect`;
      props.data.appMap?.addSource(newLayerId, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: intersections },
      });
      if (layerGroupId === 'pl') {
        props.data.appMap?.addLayer({
          id: `${newLayerId}_ly`,
          type: 'line',
          source: newLayerId,
          paint: {
            'line-color': 'yellow',
          },
        });
      } else {
        props.data.appMap?.addLayer({
          id: `${newLayerId}_ly`,
          type: 'circle',
          source: newLayerId,
          paint: {
            'circle-color': 'yellow',
            'circle-radius': 3,
          },
        });
      }
      setFeatureList(intersections as Array<Feature>);
    }
  };

  const getFeatures = async (getType: GeoDataKeys) => {
    setSelectLayer(-1);
    const urlId: { [key: string]: string } = {
      pl: 'pipes',
      vv: 'valves',
      tb: 'testbox',
      rglt: 'rglb',
    };
    const url = `/geolab/api/v1/${urlId[getType]}/all`;
    try {
      const response = await axios.get(url); // 응답을 기다림
      const data = JSON.parse(response.data.geojson_data);

      props.data.appMap?.addSource(getType, { type: 'geojson', data: data });
      props.data.appMap?.addLayer(DefaultStyleByType(getType));

      const returnObj: { [key: string]: FeatureCollection } = {};
      returnObj[`${getType}`] = data;
      return returnObj;
    } catch (error) {
      console.error('에러', error);
    }
  };

  const changeColor = (feature: Feature, layerGroupId: GeoDataKeys) => {
    const id: { [key: string]: string } = {
      pl: 'pipe_id',
      vv: 'vv_no',
    };
    const propertyName: { [key: string]: string } = {
      pl: 'line-color',
      vv: 'circle-color',
    };
    if (!feature.properties) return;
    props.data.appMap?.setPaintProperty(`${layerGroupId}_ly`, propertyName[layerGroupId], [
      'case',
      ['==', ['get', id[layerGroupId]], feature.properties[`${id[layerGroupId]}`]],
      '#EE6D6DFF',
      '#808080',
    ]);
    setSelectLayer(feature.properties[`${id[layerGroupId]}`]);
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
        <Button onClick={() => setDrawFlag(!drawFlag)}> 검색</Button>
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
          {!visible && showInfo ? (
            <InfoContent />
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
      {/* <OptionBox layerGroupId={layerGroupId} appMap={props.data.appMap} />*/}
    </>
  );
};
