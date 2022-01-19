import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import TestMetaData from './TestMetaData';
import { IScan, ITest } from '../../Types/Tests.Types';
import TestDataPlots from './TestDataPlots';

interface PreviewTestProps {
    testMetaData: ITest,
    metaDataChildren: React.ReactNode,
    testData:IScan[]
}

const PreviewTest : FC<PreviewTestProps> = (props) => (
  <Flex w="100%" flexDir="column" h="100%">
    <TestMetaData {...props.testMetaData} children={props.metaDataChildren} />
    <TestDataPlots testData={props.testData} />
  </Flex>
);

export default PreviewTest;
