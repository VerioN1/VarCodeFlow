import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

const NewTest = () => {
  const dispatch = useDispatch();
  return (
    <Flex w="100%" minH="100%" flexDir="column" p="5%" align="center">
      <h1>Tests </h1>

    </Flex>
  );
};

export default NewTest;
