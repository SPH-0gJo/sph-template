import React, { useRef } from 'react';
import { Button } from 'app/components/common-ui';
import styled from 'styled-components';

const FileUploadSelectorWrapper = styled.div`
  width: 45rem;
  height: 30rem;
  border-radius: 0.625rem;
  padding: 1rem;
  background-color: var(--light-surface-level-1);
`;

const FileSelectBox = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 50%;
  border: 1px dashed var(--dark-text-secondary);
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.8rem;
  p {
    color: var(--dark-text-secondary);
  }
`;

const FileInput = styled.input.attrs(() => ({
  type: 'file',
}))`
  width: 0;
  height: 0;
`;

interface FileUploadSelectorProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadSelector = (props: FileUploadSelectorProps) => {
  const { onFileSelect } = props;
  const fileInput = useRef<HTMLInputElement | null>(null);

  return (
    <FileUploadSelectorWrapper>
      <h4>New&nbsp;File</h4>
      <FileSelectBox>
        <p className='body_sm'>Some species live in houses where they hunt insects attracted by artificial light.</p>
        <Button
          color='dark'
          size='md'
          rounded
          onClick={() => {
            fileInput.current && fileInput.current.click();
          }}
        >
          파일&nbsp;업로드
        </Button>
        {/* <FileInput ref={fileInput} onChange={handleFileSelect} accept='.geojson, .json' multiple />*/}
        <FileInput ref={fileInput} accept='.geojson, .json' multiple onChange={onFileSelect} />
      </FileSelectBox>
    </FileUploadSelectorWrapper>
  );
};
