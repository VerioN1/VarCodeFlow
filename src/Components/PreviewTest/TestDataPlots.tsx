import React, { FC, memo } from 'react';
import { Flex } from '@chakra-ui/react';
import { IScan } from '../../Types/Tests.Types';
import TestChart from './Chart/TestChart';
import TestsTable from './Table/TestsTable';

interface TestDataPlotsProps {
  testData: IScan[];
  children?: React.ReactNode;
}

const TestDataPlots : FC<TestDataPlotsProps> = ({ testData }) => (
  <Flex w="100%" flexDir={{ base: 'column', xl: 'row' }} mt="1em">
    <Flex flexDir="column" justify="center" align="center" m="1%" flex="1">
      <TestChart scans={testData} />
    </Flex>
    <Flex flexDir="column" justify="center" align="center" m="1%" maxW={{ base: '100%', xl: '40%' }}>
      <TestsTable scans={testData} />
    </Flex>
  </Flex>
);

export default memo(TestDataPlots);
