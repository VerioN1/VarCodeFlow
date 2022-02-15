import React, { FC, memo, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { IScan } from '../../Types/Tests.Types';
import TestChart from './Chart/TestChart';
import TestsTable from './Table/TestsTable';
import spliceIntoChunks from './TestDataPlots.Logic';
import Loader from '../FetchWrapper/Loader';

interface TestDataPlotsProps {
  testData: IScan[];
  children?: React.ReactNode;
}

const TestDataPlots : FC<TestDataPlotsProps> = ({ testData }) =>
// const [selectedTest, setSelectedTest] = React.useState<Array<IScan[]>>([]);
// useEffect(() => {
//   setSelectedTest(spliceIntoChunks(testData, 200));
// }, []);

  (
    <Flex w="100%" flexDir="column" mt="1em">
      <Flex flexDir="column" justify="center" align="center" maxH="60vh" flex="1">
        {/* {selectedTest.length > 0 ? <TestChart scans={selectedTest[0]} /> : <Loader />} */}
        <TestChart scans={testData} />
      </Flex>
      <Flex flexDir="column" justify="center" align="center" maxH="40vh" m="1%" maxW={{ base: '100%', xl: '40%' }}>
        <TestsTable scans={testData} />
      </Flex>
    </Flex>
  );
export default memo(TestDataPlots);
