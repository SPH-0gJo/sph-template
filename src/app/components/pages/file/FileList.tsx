import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from 'app/components/common-ui';
import { FileListItem } from 'app/components/pages/file/FileListItem';
import { UploadGeoFiles } from 'app/components/pages/layer-management/gis-file-uploader/file-types';
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

interface FileListProps {
  fileList: UploadGeoFiles | undefined;
  uploadBlobs: File[] | undefined;
  setFileSelected: Dispatch<SetStateAction<boolean>>;
  failedIndexes: number[];
}

export const FileList = (props: FileListProps) => {
  const { fileList, uploadBlobs, setFileSelected, failedIndexes } = props;
  const { coordinateSystemList } = useCoordinateSystemStore();
  const [selectOrigin, setSelectOrigin] = useState<string>('원본 좌표계');
  const [selectTarget, setSelectTarget] = useState<string>('변환 좌표계');
  const [allChange, setAllChange] = useState<boolean>(false);

  const validationSelectValue = (value: string, flag: string) => {
    if (!coordinateSystemList.includes(parseInt(value))) value = '';
    const func = flag === 'origin' ? setSelectOrigin : setSelectTarget;
    func(value);
  };
  const trans = async (index: number) => {
    if (
      failedIndexes.includes(index) ||
      selectOrigin.includes('좌표계') ||
      selectTarget.includes('좌표계') ||
      selectOrigin.length < 1 ||
      selectTarget.length < 1 ||
      !uploadBlobs
    )
      return;
    const formData = new FormData();
    formData.append('file', uploadBlobs[index]);
    await axios
      .post(
        `/geolab/api/v1/map/coordinate-system/trans?originCoordinate=${selectOrigin}&targetCoordinate=${selectTarget}`,
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
        downloadLink.download = selectTarget + '_' + uploadBlobs[index].name; // 다운로드될 파일명
        downloadLink.click();
      });
  };

  const downloadAll = () => {
    fileList?.files.map((e, index) => {
      if (failedIndexes.includes(index)) return;
      trans(index);
    });
  };

  return (
    <>
      <FilListWrapper>
        <h4>파일 리스트</h4>
        {!fileList || fileList.files.length > 1 ? (
          <SyncAll>
            <input type={'checkbox'} onChange={(e) => setAllChange(e.currentTarget.checked)} />
            <span>일괄 변경</span>
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
                allChange={allChange}
                selectOrigin={selectOrigin}
                selectTarget={selectTarget}
                data={e}
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
        <Button color='secondary' size='md' rounded onClick={() => setFileSelected(false)}>
          &lt;
        </Button>
        <Button color='secondary' size='md' rounded>
          파일 추가
        </Button>
      </FileButtons>
    </>
  );
};
