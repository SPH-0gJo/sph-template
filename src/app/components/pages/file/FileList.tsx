import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Button } from 'app/components/common-ui';
import { FileListItem } from 'app/components/pages/file/FileListItem';
import { UploadGeoFiles } from 'app/components/pages/foss4g-tech/gis-file-uploader/file-types';
import { useCoordinateSystemStore } from 'app/stores/coordinateSystem';
import axios from 'axios';
import styled from 'styled-components';

const UploadFileOrdered = styled.ul`
  padding: 0 0.2rem;
  color: var(--light-text-primary);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FileButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const SyncAll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 6rem;
  border-radius: 0.625rem;
  margin-left: 0.625rem;
  border: 0.1px solid var(--dark-surface-level-2);
`;

const FileInput = styled.input`
  width: 0;
  height: 0;
`;

interface FileListProps {
  fileList: UploadGeoFiles | undefined;
  uploadBlobs: File[] | undefined;
  resetAll: () => void;
  failedIndexes: number[];
}

export const FileList = (props: FileListProps) => {
  const { fileList, uploadBlobs, resetAll, failedIndexes } = props;
  const { coordinateSystemList } = useCoordinateSystemStore();
  const [selectOrigin, setSelectOrigin] = useState<Array<string>>(new Array(fileList?.files.length).fill(''));
  const [selectTarget, setSelectTarget] = useState<Array<string>>(new Array(fileList?.files.length).fill(''));

  const [loadingIndex, setLoadingIndex] = useState<Array<number>>([]);

  const [allOrigin, setAllOrigin] = useState<string>('');
  const [allTarget, setAllTarget] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validationSelectValue = (index: number, value: string, flag: string) => {
    if (!coordinateSystemList.includes(parseInt(value))) value = '';
    if (flag === 'origin') {
      const tempArray = [...selectOrigin];
      tempArray[index] = value;
      setSelectOrigin(tempArray);
    } else {
      const tempArray = [...selectTarget];
      tempArray[index] = value;
      setSelectTarget(tempArray);
    }
  };
  const trans = async (index: number) => {
    if (
      failedIndexes.includes(index) ||
      selectOrigin[index].includes('좌표계') ||
      selectTarget[index].includes('좌표계') ||
      selectOrigin[index].length < 1 ||
      selectTarget[index].length < 1 ||
      !uploadBlobs
    )
      return;
    const formData = new FormData();

    formData.append('file', uploadBlobs[index]);
    let tempIndexList = [...loadingIndex];
    tempIndexList.push(index);
    setLoadingIndex(tempIndexList);
    await axios
      .post(
        `/geolab/api/v1/map/coordinate-system/trans?originCoordinate=${selectOrigin[index]}&targetCoordinate=${selectTarget[index]}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        },
      )
      .then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = selectTarget[index] + '_' + uploadBlobs[index].name; // 다운로드될 파일명
        downloadLink.click();

        if (tempIndexList.includes(index)) {
          tempIndexList = tempIndexList.filter((element) => element !== index);
          setLoadingIndex(tempIndexList);
        }
      });
  };

  const downloadAll = () => {
    fileList?.files.map((e, index) => {
      if (failedIndexes.includes(index)) return;
      trans(index);
    });
  };
  const changeAllOrigin = (value: string) => {
    if (value === '원본 좌표계' || value === '') return;
    const tempOrigin = new Array(fileList?.files.length);
    selectOrigin.map((e, idx) => {
      if (!failedIndexes.includes(idx)) tempOrigin[idx] = value;
    });
    setAllOrigin(value);
    setSelectOrigin(tempOrigin);
  };
  const changeAllTarget = (value: string) => {
    if (value === '변환 좌표계' || value === '') return;
    const tempTarget = new Array(fileList?.files.length);
    selectTarget.map((e, idx) => {
      if (!failedIndexes.includes(idx)) tempTarget[idx] = value;
    });
    setAllTarget(value);
    setSelectTarget(tempTarget);
  };
  return (
    <>
      <FilListWrapper>
        <h4>파일 리스트</h4>
        {!fileList || fileList.files.length > 1 ? (
          <SyncAll>
            <span>일괄 변경</span>
            <Input
              type='text'
              list='list'
              placeholder='원본 좌표계'
              onChange={(e) => changeAllOrigin(e.currentTarget.value)}
            />
            <Input
              type='text'
              list='list'
              placeholder='변환 좌표계'
              onChange={(e) => changeAllTarget(e.currentTarget.value)}
            />
            <datalist id='list'>
              {!coordinateSystemList || coordinateSystemList.map((e) => <option key={e}>{e}</option>)}
            </datalist>
            <Button color='secondary' size='md' rounded onClick={downloadAll}>
              전체 다운로드
            </Button>
          </SyncAll>
        ) : (
          <></>
        )}
      </FilListWrapper>
      <UploadFileOrdered>
        {!fileList ||
          fileList.files.map((e, index) => {
            return (
              <FileListItem
                loadingIndex={loadingIndex}
                selectOrigin={selectOrigin}
                selectTarget={selectTarget}
                data={e}
                allOrigin={allOrigin}
                allTarget={allTarget}
                index={index}
                coordinateSystemList={coordinateSystemList}
                failedIndexes={failedIndexes}
                validationSelectValue={validationSelectValue}
                trans={trans}
                key={index}
              />
            );
          })}
      </UploadFileOrdered>
      <FileButtons>
        <Button color='secondary' size='md' rounded onClick={resetAll}>
          &lt;
        </Button>
      </FileButtons>
    </>
  );
};
