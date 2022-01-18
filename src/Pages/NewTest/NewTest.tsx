import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import ModalDialog from '../../Components/ModalDialog/ModalDialog';

const NewTest = () => {
  const dispatch = useDispatch();
  return (
    <Flex w="100%" minH="100%" flexDir="column" p="5%" align="center">
      <h1>Tests </h1>
      <ModalDialog title="Set New Test Parameters" shouldOpen={{ isOpen: true }} onAction={() => console.log('done')} acceptButtonText="Create New Test">
        <p>hello world</p>
      </ModalDialog>
    </Flex>
  );
};

export default NewTest;
