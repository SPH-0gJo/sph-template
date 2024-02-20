import React, { useEffect, useState } from 'react';
import { FileList } from 'app/components/pages/file/FileList';
import { UploadGeoFile, UploadGeoFiles } from 'app/components/pages/layer-management/gis-file-uploader/file-types';
import { FileUploadSelector } from 'app/components/pages/layer-management/gis-file-uploader/FileUploadSelector';
import { bytesToSize } from 'shared/modules/app.utils';
import { validateGeojson } from 'shared/modules/geojson.utils';
import styled from 'styled-components';

const FileUploaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-surface-level-1);
`;

const UploadFileWrapper = styled.div`
  width: 45rem;
  height: 30rem;
  border-radius: 0.625rem;
  padding: 1rem;
  background-color: var(--light-surface-level-1);
  border-bottom: 0.125rem solid black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FileTrans = () => {
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [geoFiles, setGeoFiles] = useState<UploadGeoFiles | undefined>(undefined);
  const [uploadBlobs, setUploadBlobs] = useState<File[] | undefined>(undefined);
  const [failedIndexes, setFailedIndexes] = useState<number[]>([]); // 실패한 인덱스를 기록하는 배열

  useEffect(() => {
    if (!geoFiles || !uploadBlobs) return;
    setFileSelected(true);
    uploadBlobs.forEach(async (file, index) => await readGeoJson(file, index));
  }, [uploadBlobs]);

  async function readGeoJson(file: File, index: number) {
    try {
      const geojson = JSON.parse(await file.text());
      if (!validateGeojson(geojson) || !geojson) return undefined;
      const { features } = geojson;
      const featureType: string = features[0].geometry.type;
      const columns = Object.keys(features[0].properties);
      if (!geoFiles) return;
      Object.assign(geoFiles.files[index], { featureType, columns });
      setGeoFiles({ ...geoFiles });
    } catch (e) {
      setFailedIndexes([...failedIndexes, index]);
    }
  }

  return (
    <FileUploaderContainer>
      {fileSelected ? (
        <UploadFileWrapper>
          <FileList
            fileList={geoFiles}
            uploadBlobs={uploadBlobs}
            setFileSelected={setFileSelected}
            failedIndexes={failedIndexes}
          />
          {/* <SelectedFileButtons></SelectedFileButtons>*/}
        </UploadFileWrapper>
      ) : (
        <FileUploadSelector
          onFileSelect={(e) => {
            const files = e.target.files || [];
            if (!files.length) return;
            const blobs: File[] = [];
            const uploadFiles = Array.from(files).map((file, index): UploadGeoFile => {
              const { name, size } = file;
              blobs.push(file);
              return { name, fileSize: bytesToSize(size), fileIndex: index };
            });
            setGeoFiles({ files: uploadFiles });
            setUploadBlobs([...blobs]);
          }}
        />
      )}
    </FileUploaderContainer>
  );
};
