import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transform: scale(1.1);
  transition:
    visibility 0s linear 0.25s,
    opacity 0.25s 0s,
    transform 0.25s;

  &.show-modal {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition:
      visibility 0s linear 0s,
      opacity 0.25s 0s,
      transform 0.25s;
  }
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 34rem;
  border-radius: 0.5rem;

  p {
    margin: 0 0 10px;
  }
`;

const ModalHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
`;

const ModalBody = styled.div`
  position: relative;
  padding: 15px;
`;

const ModalFooter = styled.div`
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
`;

const Button = styled.button`
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-left: 1rem;

  &.warning {
    color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;
  }

  &.primary {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
  }
`;

interface ModalProps {
  flag: boolean;
  callBack: (arg0: boolean, arg1: boolean) => void;
  option: string;
  contents: string;
  header: string;
}

export const Modal = (props: ModalProps) => {
  const { flag, callBack, option, contents, header } = props;
  const modalWrapper = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modalWrapper) return;
    flag ? modalWrapper.current?.classList.add('show-modal') : modalWrapper.current?.classList.remove('show-modal');
  }, [flag]);

  return (
    <ModalWrapper ref={modalWrapper}>
      <ModalContent>
        <ModalHeader>
          <h3>{header}</h3>
        </ModalHeader>
        <ModalBody>
          <p>{contents}</p>
        </ModalBody>

        <ModalFooter>
          {option === 'confirm' ? (
            <>
              <Button className='primary' onClick={() => callBack(false, true)}>
                OK
              </Button>
              <Button
                ref={closeButton}
                className='warning'
                onClick={() => {
                  callBack(false, false);
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              ref={closeButton}
              className='warning'
              onClick={() => {
                callBack(false, false);
              }}
            >
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
};
