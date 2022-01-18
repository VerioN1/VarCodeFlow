import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { IScan, ITest } from '../../../../Types/Tests.Types';
import PreviewTest from '../../../../Components/PreviewTest/PreviewTest';
import { scansData } from '../../../../Utils/FakeData/scansData';

const TestRunTime: FC<ITest & React.ReactNode> = (props) => {
  const test = 'test';
  return (
    <PreviewTest
      testMetaData={props}
      metaDataChildren={
        <Flex><h1>{test}</h1></Flex>
    }
      testData={scansData as IScan[]}
    />
  );
};

export default TestRunTime;
