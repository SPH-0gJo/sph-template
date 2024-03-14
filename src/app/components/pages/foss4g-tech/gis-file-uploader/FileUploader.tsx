import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'app/components/common-ui/index';
import { UploadGeoFile, UploadGeoFiles } from 'app/components/pages/foss4g-tech/gis-file-uploader/file-types';
import { FileUploadSelector } from 'app/components/pages/foss4g-tech/gis-file-uploader/FileUploadSelector';
import { UploadFileBox } from 'app/components/pages/foss4g-tech/gis-file-uploader/UploadFileBox';
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

const SelectedFileButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const UploadFileWrapper = styled.div`
  width: 45rem;
  height: 30rem;
  border-radius: 0.625rem;
  padding: 1rem;
  background-color: var(--light-surface-level-1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FileUploader = () => {
  const [fileSelected, setFileSelected] = useState(false);
  const [geoFiles, setGeoFiles] = useState<UploadGeoFiles | undefined>(undefined);
  const [uploadBlobs, setUploadBlobs] = useState<File[] | undefined>(undefined);

  useEffect(() => {
    if (!geoFiles || !uploadBlobs) return;
    setFileSelected(true);
    uploadBlobs.forEach(async (file, index) => await readGeoJson(file, index));
  }, [uploadBlobs]);

  const isVerifiedFiles = useMemo(() => {
    if (!geoFiles) return false;
    const { files } = geoFiles;
    return !files.map((e) => e.featureType !== undefined).includes(false);
  }, [geoFiles]);

  async function readGeoJson(file: File, index: number) {
    const id = `readGeoJson_${index}`;
    console.time(id);
    const geojson = JSON.parse(await file.text());
    if (!validateGeojson(geojson) || !geojson) return undefined;
    const { features } = geojson;
    const featureType: string = features[0].geometry.type;
    const columns = Object.keys(features[0].properties);
    if (!geoFiles) return;
    Object.assign(geoFiles.files[index], { featureType, columns });
    setGeoFiles({ ...geoFiles });
    console.timeEnd(id);
  }

  return (
    <FileUploaderContainer>
      {fileSelected ? (
        <UploadFileWrapper>
          <UploadFileBox data={{ geoFiles }} />
          <SelectedFileButtons>
            <Button
              color='secondary'
              size='md'
              rounded
              onClick={() => {
                setFileSelected(false);
                setGeoFiles(undefined);
                setUploadBlobs(undefined);
              }}
            >
              다른파일선택
            </Button>
            {!isVerifiedFiles || (
              <Button color='dark' size='md' rounded>
                파일&nbsp;업로드
              </Button>
            )}
          </SelectedFileButtons>
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
