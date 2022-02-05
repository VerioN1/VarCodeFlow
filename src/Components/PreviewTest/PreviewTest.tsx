import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import TestMetaData from './TestMetaData';
import { IScan, IExperiment } from '../../Types/Tests.Types';
import TestDataPlots from './TestDataPlots';

interface PreviewTestProps {
    testMetaData: IExperiment,
    metaDataChildren: React.ReactNode,
    testScans:IScan[]
}

const PreviewTest : FC<PreviewTestProps> = (props) => (
  <Flex w="100%" flexDir="column" h="100%">
    <TestMetaData {...props.testMetaData} children={props.metaDataChildren} />
    <TestDataPlots testData={props.testScans} />
  </Flex>
);
export default PreviewTest;
