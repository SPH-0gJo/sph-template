import React, { useEffect, useState } from 'react';
import { Button } from 'app/components/common-ui/index';
import { UploadGeoFiles } from 'app/components/pages/layer-management/gis-file-uploader/file-types';
import styled from 'styled-components';

const UploadFileOrdered = styled.ul`
  padding: 0 1.2rem;
  color: var(--light-text-primary);
  overflow-y: auto;
`;

const UploadedFileItem = styled.li`
  cursor: pointer;
  width: 100%;
  border-bottom: 0.025rem solid var(--dark-text-secondary);
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding: 0.5rem 1rem;
  div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
`;

const GeojsonInfoBox = styled.div`
  padding: 0.5rem 2rem;
  border-radius: 0.625rem;
  background-color: var(--black-a16);
`;

const FileMetaTags = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  span {
    color: var(--dark-text-primary);
    padding: 0.1rem 1rem;
    border-radius: 0.625rem;
  }
`;

const GeoDataType = styled.span`
  background-color: var(--palette-green-700);
`;

const GeoDataFeatureType = styled.span`
  background-color: var(--palette-red-700);
`;

const GeojsonColumnItem = styled.span`
  background-color: var(--dark-surface-level-2);
`;

interface UploadFilesData {
  geoFiles: UploadGeoFiles | undefined;
}

interface UploadFilesProps {
  data: UploadFilesData;
}

export const UploadFileBox = (props: UploadFilesProps) => {
  const { geoFiles } = props.data;
  const [geoFileInfoBoxIdx, setGeoFileInfoBoxIdx] = useState<number | undefined>(undefined);

  useEffect(() => {
    return () => setGeoFileInfoBoxIdx(undefined);
  }, []);

  return (
    <>
      <h4>파일&nbsp;리스트</h4>
      <UploadFileOrdered>
        {!geoFiles ||
          geoFiles.files.map((e, index) => {
            return (
              <UploadedFileItem key={index}>
                <div>
                  <span>{e.name}</span>
                  <p className='caption'>
                    <span>{e.fileSize}</span>
                    <Button
                      color={!e.featureType ? 'secondary' : 'dark'}
                      size='sm'
                      rounded
                      onClick={() => {
                        if (geoFileInfoBoxIdx === index) setGeoFileInfoBoxIdx(undefined);
                        else setGeoFileInfoBoxIdx(index);
                      }}
                    >
                      {!e.featureType ? 'Not verified' : 'Verified'}
                    </Button>
                  </p>
                </div>
                {!(geoFileInfoBoxIdx === index) || (
                  <GeojsonInfoBox>
                    <FileMetaTags className='caption'>
                      <GeoDataType>Geojson</GeoDataType>
                      <GeoDataFeatureType>{e.featureType}</GeoDataFeatureType>
                      {e.columns?.map((e, index) => {
                        return <GeojsonColumnItem key={`geojson_column_${index}`}>{e.toLowerCase()}</GeojsonColumnItem>;
                      })}
                    </FileMetaTags>
                  </GeojsonInfoBox>
                )}
              </UploadedFileItem>
            );
          })}
      </UploadFileOrdered>
    </>
  );
};
