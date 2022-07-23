import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button, Flex, IconButton, Input,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { useMutation } from 'react-query';
import { updateExperimentDetails } from '../../services/Experiments.services';
import popToast from '../Toasts/PopToast';

type Props = {
  fieldName: string
  textToEdit: string
  id: string
}

const EditableControls = ({ textToEdit, id, fieldName }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [newText, setNewText] = useState(textToEdit);

  const mutate = useMutation(updateExperimentDetails);

  const onSuccess = async () => {
    const data = await mutate.mutateAsync({ [fieldName]: newText, experimentId: id });
    if (data.experimentName === newText) {
      popToast.PopSuccessToast('experiment data has changed');
      setTimeout(() => window.location.reload(), 1200);
    } else {
      popToast.PopErrorToast('error while trying to change the experiment details');
    }
    onClose();
  };

  return (
    <>
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} onClick={onOpen} aria-label="edit string" />
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Edit Experiment details
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input value={newText} onChange={(e) => setNewText(e.target.value)} />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={onSuccess} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default EditableControls;
