import { ComponentType } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

// TODO: `any` can be replaced with the custom interface of the props satisfying the 
//        IntrinsicAttributes of Modal and overridden attrs.

const StyledModal = styled<ComponentType<any>>(Modal)`
  background: #ffffff;
  border-radius: 0;
  border: none;
  bottom: 120px;
  font-family: "Open Sans";
  height: auto;
  left: 0;
  margin: 0 auto;
  outline: none;
  overflow: auto;
  padding: 24px;
  position: absolute;
  right: 0;
  top: 120px;
  width: 750px;
`;

const ModalContent = styled.div`
  height: 100%;
  padding: 64px 0;
  position: relative;
`;

const ModalCloseButton = styled.div`
  color: rgba(0, 0, 0, 1);
  cursor: pointer;
  font-size: 24px;
  line-height: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export {
  StyledModal,
  ModalContent,
  ModalCloseButton,
}