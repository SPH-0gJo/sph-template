import React, { useEffect, useRef } from 'react';
import { Button } from 'app/components/common-ui';
import { UploadGeoFile } from 'app/components/pages/layer-management/gis-file-uploader/file-types';
import styled from 'styled-components';

const UploadedFileItem = styled.li`
  position: relative;
  cursor: pointer;
  width: 100%;
  border-bottom: 0.025rem solid var(--dark-text-secondary);
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

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

const InputDiv = styled.div`
  display: flex;
  padding-right: 0.625rem;

  input {
    width: 6rem;
    border-radius: 0.625rem;
    margin-left: 0.625rem;
    border: 0.1px solid var(--dark-surface-level-2);
  }
`;

const BlockDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: var(--black-a65);
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: var(--palette-red-400);
  }
`;

interface FileListItemProps {
  data: UploadGeoFile;
  validationSelectValue: (arg0: number, arg1: string, arg2: string) => void;
  trans: (arg0: number) => void;
  index: number;
  failedIndexes: number[];
  coordinateSystemList: Array<number>;
  selectOrigin: string[];
  selectTarget: string[];
  allOrigin: string;
  allTarget: string;
  loadingIndex: Array<number>;
}

export const FileListItem = (props: FileListItemProps) => {
  const {
    data,
    validationSelectValue,
    trans,
    index,
    failedIndexes,
    coordinateSystemList,
    selectOrigin,
    selectTarget,
    allOrigin,
    allTarget,
    loadingIndex,
  } = props;
  const originRef = useRef<HTMLInputElement>(null);
  const targetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!originRef.current || failedIndexes.includes(index) || allOrigin === '') return;
    originRef.current.value = allOrigin;
  }, [allOrigin]);
  useEffect(() => {
    if (!targetRef.current || failedIndexes.includes(index) || allOrigin === '') return;
    targetRef.current.value = allTarget;
  }, [allTarget]);
  return (
    <UploadedFileItem key={index}>
      <div
        style={{
          padding: '0.5rem 1rem',
        }}
      >
        <span>{data.name}</span>
        <p className='caption'>
          <span>{data.fileSize}</span>
        </p>
        <InputDiv>
          <input
            ref={originRef}
            type='text'
            list='list'
            placeholder='원본 좌표계'
            onChange={(e) => validationSelectValue(index, e.currentTarget.value, 'origin')}
          />
          <input
            ref={targetRef}
            type='text'
            list='list'
            placeholder='변환 좌표계'
            onChange={(e) => validationSelectValue(index, e.currentTarget.value, 'target')}
          />
          <datalist id='list'>
            {!coordinateSystemList || coordinateSystemList.map((e) => <option key={e}>{e}</option>)}
          </datalist>
        </InputDiv>
        <Button
          color={selectOrigin[index] !== '' && selectTarget[index] !== '' ? 'dark' : 'light'}
          size='md'
          rounded
          onClick={() => {
            trans(index);
          }}
          disabled={
            coordinateSystemList.includes(parseInt(selectOrigin[index])) &&
            coordinateSystemList.includes(parseInt(selectTarget[index]))
          }
        >
          파일 변환
        </Button>
      </div>
      {!failedIndexes.includes(index) || (
        <BlockDiv>
          <span>잘 못 된 형식의 파일입니다.</span>
        </BlockDiv>
      )}
      {!loadingIndex.includes(index) || (
        <BlockDiv>
          <span>다운로드 중</span>
        </BlockDiv>
      )}
    </UploadedFileItem>
  );
};
