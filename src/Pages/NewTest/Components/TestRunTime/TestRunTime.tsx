import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import {
  Button, Flex, Input,
} from '@chakra-ui/react';
import { IScan, ITest } from '../../../../Types/Tests.Types';
import PreviewTest from '../../../../Components/PreviewTest/PreviewTest';
import { scansData } from '../../../../Utils/FakeData/scansData';
import FinishTestDialog from '../FinishTestDialog/FinishTestDialog';

const TestRunTime: FC<ITest & React.ReactNode> = (props) => {
  const [isPaused, setIsPaused] = useState(false);
  const refInput = useRef<HTMLInputElement>();
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) {
        return;
      }
      if (refInput.current && !isPaused) {
        refInput.current.focus();
      }
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [isPaused]);

  return (
    <PreviewTest
      testMetaData={props}
      metaDataChildren={(
        <Flex justify="space-around" mt="1rem">
          {/* @ts-ignore */}
          <Input ref={refInput} type="text" placeholder="Barcode scanner typer" w="50%" />
          {isPaused
            ? <Button w="15%" colorScheme="green" onClick={() => setIsPaused((prev) => !prev)}>Resume</Button>
            : <Button onClick={() => setIsPaused((prev) => !prev)} w="15%" colorScheme="yellow">Pause</Button>}
          <FinishTestDialog />
        </Flex>
      )}
      testData={scansData as IScan[]}
    />
  );
};

export default TestRunTime;
