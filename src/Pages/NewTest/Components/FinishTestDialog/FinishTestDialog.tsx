import { Textarea } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDialog from '../../../../Components/ModalDialog/ModalDialog';
import submitTest from './FinishTest.logic';
import fd from '../../../../Utils/Time/Date.Format';

const FinishTestDialog = ({ testId }: {testId: string}) => {
  const inputRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (inputRef.current) {
      submitTest(testId, { comments: inputRef.current.value ?? 'no comments', deactivationDate: fd.formatDateAndTime(new Date()) }, navigate);
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
