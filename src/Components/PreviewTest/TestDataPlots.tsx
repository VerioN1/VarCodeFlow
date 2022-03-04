import React, { FC, memo, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { IScan } from '../../Types/Tests.Types';
import TestChart from './Chart/TestChart';
import TestsTable from './Table/TestsTable';

interface TestDataPlotsProps {
  testData: IScan[];
  children?: React.ReactNode;
}

const TestDataPlots : FC<TestDataPlotsProps> = ({ testData }) => {
  const [switchPlace, setSwitchPlace] = useState(window.localStorage.getItem('chartsPlace'));
  const setSwitch = () => {
    window.localStorage.setItem('chartsPlace', switchPlace === 'up' ? 'down' : 'up');
    setSwitchPlace((prev) => (prev === 'up' ? 'down' : 'up'));
  };
  return (
    <Flex w="100%" flexDir="column" mt="1em">
      <Flex align="center">
        <Text mr={2}>Show Table First</Text>
        <input type="checkbox" onChange={setSwitch} checked={switchPlace === 'up'} />
      </Flex>
      {switchPlace === 'up' ? (
        <>
          <Flex flexDir="column" justify="center" align="center" maxH="70vh" m="1%" maxW={{ base: '100%' }}>
            <TestsTable scans={testData} />
          </Flex>
          <Flex flexDir="column" justify="center" align="center" maxH="60vh" flex="1">
            <TestChart scans={testData} />
          </Flex>
        </>
      ) : (
        <>
          <Flex flexDir="column" justify="center" align="center" maxH="60vh">
            <TestChart scans={testData} />
          </Flex>
          <Flex flexDir="column" justify="center" align="center" maxH="70vh" m="1%" maxW={{ base: '100%' }}>
            <TestsTable scans={testData} />
          </Flex>
        </>
      )}

    </Flex>
  );
};
export default memo(TestDataPlots);
