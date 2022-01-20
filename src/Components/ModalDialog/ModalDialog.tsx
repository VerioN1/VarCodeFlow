import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Tooltip, useDisclosure,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { ErrorResponse } from '../../Types/Errors.Types';

type props = {
  title: string;
  children: React.ReactNode;
  shouldOpen: {
      isOpen: boolean;
      buttonText?: string;
      toolTipText?: string;
      buttonProps?: Object;
  };
  isCancelable?: boolean;
  onAction: () => void;
  acceptButtonText: string;
  rest?:Object;
};

const ModalDialog :FC<props> = ({
  title, children, shouldOpen, isCancelable = true, onAction, acceptButtonText, rest,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: shouldOpen.isOpen });

  return (
    <>
      {shouldOpen.isOpen
        ? null
        : (
          <Tooltip hasArrow label={shouldOpen.toolTipText}>
            <Button {...shouldOpen.buttonProps} onClick={onOpen}>{shouldOpen.buttonText}</Button>
          </Tooltip>
        )}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent {...rest}>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody pb={6}>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={async () => {
                try {
                  await onAction();
                  onClose();
                } catch (e) {
                  if (e instanceof ErrorResponse) {
                    console.log(e.message);
                  } else {
                    console.log(e);
                  }
                }
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
