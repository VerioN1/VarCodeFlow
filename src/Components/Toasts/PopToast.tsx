import React from 'react';
import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../Utils/Style/theme';
import ErrorToast from './Error.Toast';
import SuccessToast from './Success.Toast';
import InfoToast from './Info.Toast';

const PopErrorToast = (message : string) => {
  const toast = createStandaloneToast({ theme });
  return toast({
    position: 'bottom-right',
    render: () => (
      <ErrorToast message={message} />
    ),
  });
};
const PopInfoToast = (message: string) => {
  const toast = createStandaloneToast({ theme });
  return toast({
    position: 'bottom-right',
    duration: 2500,
    render: () => (
      <InfoToast message={message} />
    ),
  });
};
const PopSuccessToast = (message : string) => {
  const toast = createStandaloneToast({ theme });
  return toast({
    position: 'bottom-right',
    render: () => (
      <SuccessToast message={message} />
    ),
  });
};

export default { PopErrorToast, PopInfoToast, PopSuccessToast };
