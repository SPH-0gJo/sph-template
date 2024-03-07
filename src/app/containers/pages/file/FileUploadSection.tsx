import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'app/components/common-ui';
import { Modal } from 'app/components/common-ui/Modal';
import { addGeoJsonMap } from 'app/components/pages/file/geojson-upload/geojson.layer';
import { UploadFileList } from 'app/containers/pages/file/UploadFileList';
import axios from 'axios';
import { Map as AppMap } from 'maplibre-gl';
import styled from 'styled-components';

const FileUploadWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;

  &.load {
    height: 100%;
  }
`;

const FileSelectBox = styled.div`
  padding: 1rem;
  width: 100%;
  height: 90%;
  border: 0.125rem dashed var(--dark-text-secondary);
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.8rem;
  background-color: var(--white-a100);

  p {
    color: var(--dark-text-secondary);
  }
`;

const UploadTitle = styled.div`
  width: 100%;
  height: 5%;
  background-color: var(--white-a100);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.075rem solid var(--black-a8);
  border-bottom: 0.075rem solid var(--black-a8);
`;
const UploadBtn = styled.button`
  color: var(--dark-surface-level-2);
  font-size: 1rem;
  width: 100%;
  height: 5%;
  border: none;
  border-top: 0.075rem solid var(--black-a8);
  background-color: var(--white-a100);

  &:hover {
    color: var(--white-a100);
    background-color: var(--dark-surface-level-2);
  }
`;

const LoadingScreen = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: var(--black);
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0.5;
`;
const FileInput = styled.input.attrs(() => ({
  type: 'file',
}))`
  width: 0;
  height: 0;
`;

interface FileUploadSectionProps {
  map: AppMap | null;
}

export const FileUploadSection = (props: FileUploadSectionProps) => {
  const { map } = props;
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [geoFiles, setGeoFiles] = useState<FileList | never[]>();
  const [layerList, setLayerList] = useState<string[]>([]);
  const [checkMap, setCheckMap] = useState<Map<string, string>>(new Map());
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [layerColor, setLayerColor] = useState<Map<string, string>>(new Map());
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!map) return;
    const files = e.target.files || [];
    if (!files.length) return;
    setGeoFiles(files);

    const sameLayerList: string[] = [];
    const newLayerList: string[] = [];
    const newColorMap = new Map();

    Promise.all(
      [...files].map(async (file) => {
        const fileUrl = URL.createObjectURL(file);

        const obj = JSON.parse(await file.text());
        addGeoJsonMap(map, fileUrl, file.name).then(async () => {
          // const geojson = JSON.parse(await file.text());
          // console.log(geojson);
          if (map?.getSource('geolab-layers')?.vectorLayerIds?.includes(file.name.replaceAll('.geojson', ''))) {
            sameLayerList.push(file.name);
          } else {
            newLayerList.push(file.name);
          }
          const color = addLayer(file.name, obj.features[0].geometry.type);
          newColorMap.set(file.name, color);
        });
      }),
    ).then(() => {
      if (sameLayerList.length > 0) alert(sameLayerList.toString() + '는 중복된 레이어 입니다.');
      setLayerList(newLayerList);
      setLayerColor(newColorMap);
    });
  };

  useEffect(() => {
    if (layerList.length <= 0) return;
    const tempMap = new Map();
    layerList.map((layer) => {
      tempMap.set(layer, 'visible');
    });
    setCheckMap(tempMap);
  }, [layerList]);

  const addLayer = (fileName: string, type: string) => {
    const color = makeRandomColor();

    switch (type) {
      case 'Point':
        map?.addLayer({
          id: fileName,
          type: 'circle',
          source: fileName,
          paint: {
            'circle-radius': 2,
            'circle-color': color,
          },
        });
        break;
      case 'LineString':
        map?.addLayer({
          id: fileName,
          type: 'line',
          source: fileName,
          paint: {
            'line-color': color,
          },
        });
        break;
      default:
        map?.addLayer({
          id: fileName,
          type: 'fill',
          source: fileName,
          paint: {
            'fill-color': color,
            'fill-opacity': 0.3,
          },
        });
        break;
    }
    return color;
  };

  const offLayer = (layer: string, flag: boolean) => {
    const visibility = flag ? 'visible' : 'none';
    const tempMap = new Map(checkMap);
    tempMap.set(layer, visibility);
    map?.setLayoutProperty(layer, 'visibility', visibility);
    setCheckMap(tempMap);
  };

  function makeRandomColor() {
    const r = Math.floor(Math.random() * 150);
    const g = Math.floor(Math.random() * 150);
    const b = Math.floor(Math.random() * 150);
    return `rgb(${r},${g},${b})`;
  }

  const checkResult = (flag: boolean, confirm: boolean) => {
    setModalOpen(flag);
    setModalConfirm(confirm);
  };

  useEffect(() => {
    if (modalConfirm) {
      console.log(checkMap);
      const tempFiles: string[] = [];
      Array.from(checkMap).map((val) => {
        val[1] === 'visible' ? tempFiles.push(val[0]) : '';
      });
      uploadStart(tempFiles);
    }
  }, [modalConfirm]);

  useEffect(() => {
    let msg = '';
    if (checkMap.size <= 0) return;
    Array.from(checkMap).map((val) => {
      msg = val[1] === 'visible' ? msg + val[0].toString() + '\n' : msg;
    });
    setModalMsg(msg);
  }, [checkMap]);

  const uploadStart = async (onFile: string[]) => {
    setUploadLoading(true);
    const formData = new FormData();
    Array.from(geoFiles as File[]).map((file) => {
      if (onFile.includes(file.name)) formData.append('files', file);
    });
    await axios
      .post('/geolab/api/v1/map/coordinate-system/mbtiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      })
      .then(() => {
        setUploadLoading(false);
        alert('업로드 완료 되었습니다.');
        window.location.reload();
      });
  };

  const modalFlag = (flag: boolean) => {
    console.log(checkMap);
    if (checkMap.size <= 0) {
      alert('파일을 업로드 주세요');
      return;
    }
    let tempFlag: boolean = false;
    Array.from(checkMap).map((val) => {
      if (val[1] === 'visible') tempFlag = true;
    });
    if (!tempFlag) {
      alert('하나 이상의 파일을 선택해 주세요');
      return;
    }
    setModalOpen(flag);
  };

  return (
    <FileUploadWrapper className={layerList.length <= 0 ? 'load' : ''}>
      <UploadTitle>
        <h6>Select Files</h6>
      </UploadTitle>
      {layerList.length > 0 ? (
        <UploadFileList layerList={layerList} offLayer={offLayer} checkMap={checkMap} layerColor={layerColor} />
      ) : (
        <FileSelectBox>
          {/* <p className='body_sm'>Some species live in houses where they hunt insects attracted by artificial light.</p>*/}
          <Button
            color='dark'
            size='md'
            rounded
            onClick={() => {
              fileInput.current && fileInput.current.click();
            }}
          >
            File&nbsp;Upload
          </Button>
          <FileInput ref={fileInput} accept='.geojson, .json' multiple onChange={onFileSelect} />
        </FileSelectBox>
      )}
      <UploadBtn onClick={() => modalFlag(true)}>
        <h6> Files Upload</h6>
      </UploadBtn>
      {uploadLoading && <LoadingScreen />}
      <Modal
        flag={modalOpen}
        callBack={checkResult}
        option={'confirm'}
        contents={modalMsg}
        header={'선택 파일 업로드'}
      />
    </FileUploadWrapper>
  );
};
