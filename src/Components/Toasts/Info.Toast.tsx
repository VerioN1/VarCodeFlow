import {
  Box, chakra, Flex, Icon, useColorModeValue,
} from '@chakra-ui/react';
import { IoMdAlert } from 'react-icons/io';
import React from 'react';

const InfoToast = ({ message }: {message: string}) => (
  <Flex
    w="full"
    p={50}
    alignItems="center"
    justifyContent="center"
  >
    <Flex
      maxW="sm"
      w="full"
      mx="auto"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="md"
      rounded="lg"
      overflow="hidden"
    >
      <Flex justifyContent="center" alignItems="center" w={12} bg="blue.500">
        <Icon as={IoMdAlert} color="white" boxSize={6} />
      </Flex>

      <Box mx={-3} py={2} px={4}>
        <Box mx={3}>
          <chakra.p
            // color={useColorModeValue('blue.500', 'blue.400')}
            color="black"
            fontSize="lg"
          >
            Info
          </chakra.p>
          <chakra.p
            color={useColorModeValue('gray.600', 'gray.200')}
            fontSize="sm"
          >
            {message}
          </chakra.p>
        </Box>
      </Box>
    </Flex>
  </Flex>
);

export default InfoToast;
