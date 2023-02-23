import React, { ReactElement, FunctionComponent } from 'react';
import { FaTimes } from "react-icons/fa";

import Form from "../form";
import {
  ModalCloseButton,
  ModalContent,
  StyledModal,
} from './styles'

import styles from "./modal.module.css";

// TODO: SubmitPayload should be somewhere centralised across components and modules
interface SumbitPayload {
  description: string;
  price: string;
  title: string;
}

interface OwnProps {
  handleSubmit(attrs: SumbitPayload): Promise<void>;
  isOpen: boolean;
  onToggle(): void;
}

type Props = OwnProps;

const Modal: FunctionComponent<Props> = ({
  handleSubmit,
  isOpen,
  onToggle,
}): ReactElement => {
  
  return (
    <StyledModal
      isOpen={isOpen}
      overlayClassName={styles.reactModalOverlay} // classnames package can save me another file
    >
      <ModalContent>
        <ModalCloseButton onClick={onToggle}>
          <FaTimes />
        </ModalCloseButton>

        <Form on-submit={handleSubmit} />
      </ModalContent>
    </StyledModal>
  );
}

export default Modal;