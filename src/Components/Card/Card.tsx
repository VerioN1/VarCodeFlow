/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { Dict } from '../../Types/Utils.Types';

const Card : FC<Dict<any>> = (props) => {
  const { children } = props;
  return (
    <Flex
      borderWidth="1px"
      p="16px"
      boxShadow="lg"
      h="fit-content"
      borderRadius="lg"
      flexDir="column"
      overflow="hidden"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Card;
