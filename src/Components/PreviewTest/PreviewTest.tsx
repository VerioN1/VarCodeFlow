import React, { FC, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import TestMetaData from './TestMetaData';
import { IScan, IExperiment } from '../../Types/Tests.Types';
import TestDataPlots from './TestDataPlots';
import spliceIntoChunks from './TestDataPlots.Logic';
import ChooseChunkFromScans from './ChooseChunkFromScans';

interface PreviewTestProps {
    testMetaData: IExperiment,
    metaDataChildren?: React.ReactNode,
    testScans:IScan[]
}

const PreviewTest : FC<PreviewTestProps> = ({ testMetaData, metaDataChildren, testScans }) => {
  const [selectedTest, setSelectedTest] = useState<Array<IScan[]>>([]);
  const [selectedChunk, setSelectedChunk] = useState(0);
  const [limit, setLimit] = useState([0]);
  useEffect(() => {
    const splicedTestsData = spliceIntoChunks(testScans, 200);
    setLimit(Array.from(Array(splicedTestsData.length).keys()));
    setSelectedTest(splicedTestsData);
  }, []);
  return (
    <Flex w="100%" flexDir="column" h="100%">
      <TestMetaData {...testMetaData} children={metaDataChildren} />
      <ChooseChunkFromScans setSelectChunk={setSelectedChunk} limit={limit} />
      {selectedTest.length > 0 && <TestDataPlots testData={selectedTest[selectedChunk]} />}
    </Flex>
  );
};
export default PreviewTest;
