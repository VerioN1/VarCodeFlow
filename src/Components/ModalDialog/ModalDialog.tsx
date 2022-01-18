import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import React, { FC } from 'react';

type props = {
  title: string;
  children: React.ReactNode;
  shouldOpen: {
      isOpen: boolean;
      buttonText?: string;
  };
  isCancelable?: boolean;
  onAction: () => void;
    acceptButtonText: string
};

const ModalDialog :FC<props> = ({
  title, children, shouldOpen, isCancelable = true, onAction, acceptButtonText,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: shouldOpen.isOpen });

  return (
    <>
      {shouldOpen.isOpen ? null : <Button onClick={onOpen}>{shouldOpen.buttonText}</Button>}

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody pb={6}>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onAction();
                onClose();
              }}
              colorScheme="blue"
              mr={3}
            >
              {acceptButtonText}
            </Button>
            {isCancelable ? <Button onClick={onClose}>Cancel</Button> : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDialog;
