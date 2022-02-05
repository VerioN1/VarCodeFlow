import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Home = () => (
  <Flex w="100%" minH="100%" flexDir="column" p="5%" align="center">
    <Text
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
      fontSize="6xl"
      fontWeight="extrabold"
    >
      Var Code
      {' '}
    </Text>
  </Flex>
);

export default Home;
