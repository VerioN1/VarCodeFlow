import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import varcodeLogo from '../../Assets/Varcode-new-logo.png';

const Home = () => (
  <Flex w="100%" minH="100%" flexDir="column" p="5%" align="center">
    <Image
      src={varcodeLogo}
      alt="Barcode"
      htmlHeight="200px"
      htmlWidth="400px"
    />
  </Flex>
);

export default Home;
