import React from 'react';
import {
  AlertDialog, AlertDialogBody,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay, Button,
  Flex,
  IconButton, useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

type Props = {
  onAccept?: Function | undefined
  body: string | React.ReactNode
  title: string
}

const Dialog = ({ onAccept = undefined, body, title }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  return (
    <>
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<AddIcon />} onClick={onOpen} aria-label="edit string" />
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {body}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
              {onAccept && (
              <Button
                colorScheme="green"
                onClick={async () => {
                  await onAccept();
                  onClose();
                }}
                ml={3}
              >
                Confirm
              </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Dialog;
