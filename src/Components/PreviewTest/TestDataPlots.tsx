import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { IScan } from '../../Types/Tests.Types';
import TestChart from './Chart/TestChart';

interface TestDataPlotsProps {
  testData: IScan[];
  children?: React.ReactNode;
}

const TestDataPlots : FC<TestDataPlotsProps> = ({ testData }) => (
  <Flex w="100%" flexDir={{ base: 'column', xl: 'row' }} mt="1em">
    <Flex flexDir="column" justify="center" align="center" flex="1">
      <h1>Test Data Plots</h1>
    </Flex>
    <Flex flexDir="column" justify="center" align="center" flex="1">
      <h1> Charts </h1>
      <TestChart scans={testData} />
    </Flex>
  </Flex>
);

export default TestDataPlots;
