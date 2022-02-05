import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  Button, Flex, Input,
} from '@chakra-ui/react';
import { IScan, IExperiment } from '../../../../Types/Tests.Types';
import PreviewTest from '../../../../Components/PreviewTest/PreviewTest';
import FinishTestDialog from '../FinishTestDialog/FinishTestDialog';
import dateFormat from '../../../../Utils/Time/Date.Format';
import SubmitScans from './TestRunTime.Logic';
import Logger from '../../../../Utils/Logger/Logger.Logic';

const TestRunTime = ({ experiment } : {experiment: IExperiment}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [scans, setScans] = useState<IScan[]>([]);
  const counterRef = useRef(1);
  const roundCounterRef = useRef(Number(experiment.scans[experiment.scans.length - 1].round) + 1 ?? 0);
  const [barCodeValue, setBarCodeValue] = useState('');
  const [scansBundleForCharts, setScansBundleForCharts] = useState(experiment.scans.slice(-100));
  const refInput = useRef<HTMLInputElement>();

  const handleOnChange = (e: { target: { value: any; }; }) => {
    const { value } = e.target;
    console.log(value);
    if (value.length > 10) {
      setScans((prev) => [...prev, { barCode: value, date: dateFormat.formatDateAndTime(new Date()), round: roundCounterRef.current.toString() }]);
      counterRef.current += 1;
      setBarCodeValue('');
      Logger.Log('Scan added', { toast: 'true' });
    } else {
      setBarCodeValue(value);
    }
  };
  useEffect(() => {
    if (counterRef.current > experiment.setSize) {
      counterRef.current = 1;
      roundCounterRef.current += 1;
      SubmitScans(experiment._id, scans);
      setScansBundleForCharts((prev) => [...prev.slice(-90), ...scans]);
      setScans([]);
    }
  }, [scans]);

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
      testMetaData={experiment}
      metaDataChildren={(
        <Flex justify="space-around" mt="1rem">
          {/* @ts-ignore */}
          <Input ref={refInput} value={barCodeValue} onChange={handleOnChange} type="text" placeholder="Barcode scanner typer" w="50%" />
          {isPaused
            ? <Button w="15%" colorScheme="green" onClick={() => setIsPaused((prev) => !prev)}>Resume</Button>
            : <Button onClick={() => setIsPaused((prev) => !prev)} w="15%" colorScheme="yellow">Pause</Button>}
          {/* eslint-disable-next-line no-underscore-dangle,react/destructuring-assignment */}
          <FinishTestDialog testId={experiment._id} />
        </Flex>
      )}
      testScans={scansBundleForCharts}
    />
  );
};

export default TestRunTime;
