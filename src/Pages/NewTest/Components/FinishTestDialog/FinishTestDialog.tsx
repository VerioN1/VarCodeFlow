import { Textarea } from '@chakra-ui/react';
import React, { useRef } from 'react';
import ModalDialog from '../../../../Components/ModalDialog/ModalDialog';

const FinishTestDialog = () => {
  const inputRef = useRef<HTMLInputElement>();
  const handleSubmit = () => {
    if (inputRef.current) {
      console.log(inputRef.current.value);
    }
  };

  return (
    <ModalDialog
      title="Finish Test"
      shouldOpen={{
        isOpen: false, buttonText: 'Stop', buttonProps: { w: '15%', colorScheme: 'red' }, toolTipText: 'Finish Test and submit results.',
      }}
      onAction={handleSubmit}
      acceptButtonText="Send Results"
    >
      <p>Are you sure you want to finish the test?</p>
      <p>You will not be able to finish the test again.</p>
      <Textarea
        // @ts-ignore
        ref={inputRef}
        placeholder="Enter any conclusion, or comment you want to add to the test"
        size="sm"
      />
    </ModalDialog>
  );
};

export default FinishTestDialog;
