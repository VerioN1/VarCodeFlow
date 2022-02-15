import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  Button, Flex, Input,
} from '@chakra-ui/react';
import { differenceInSeconds } from 'date-fns';
import { IScan, IExperiment } from '../../../../Types/Tests.Types';
import PreviewTest from '../../../../Components/PreviewTest/PreviewTest';
import FinishTestDialog from '../FinishTestDialog/FinishTestDialog';
import dateFormat from '../../../../Utils/Time/Date.Format';
import SubmitScans from './TestRunTime.Logic';
import Logger from '../../../../Utils/Logger/Logger.Logic';
import popToast from '../../../../Components/Toasts/PopToast';

const TestRunTime = ({ experiment } : {experiment: IExperiment}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [scans, setScans] = useState<IScan[]>([]);
  const timeoutInSeconds = experiment.drumInterval * 1000;
  const roundCounterRef = useRef(experiment?.scans?.length > 0 ? Number(experiment.scans[experiment.scans.length - 1].round) + 1 : 0);
  const [barCodeValue, setBarCodeValue] = useState('');
  const [scansBundleForCharts, setScansBundleForCharts] = useState(experiment.scans.slice(-100));
  const refInput = useRef<HTMLInputElement>();

  const handleOnChange = (e: { target: { value: any; }; }) => {
    const { value } = e.target;
    const clearInputTimeout = setTimeout(() => {
      setBarCodeValue('');
    }, 1500);
    if (value.length > 11) {
      clearTimeout(clearInputTimeout);
      const seconds = differenceInSeconds(new Date(), new Date(experiment.activationDate));
      const hourseElapsed = Math.floor((seconds / 60) / 60).toString().padStart(2, '0');
      const minutesElapsed = Math.floor((seconds / 60) % 60).toString().padStart(2, '0');
      setScans((prev) => [...prev, {
        barCode: value,
        QC: value.substring(
          value.length - 2,
          value.length - 1,
        ),
        round: roundCounterRef.current.toString(),
        elpasedTime: `${hourseElapsed}:${minutesElapsed}`,
        date: dateFormat.formatDateAndTime(new Date()),
      }]);
      setBarCodeValue('');
      Logger.Log(`Scan added ${value}`, { toast: 'true' });
    } else {
      setBarCodeValue(value);
    }
  };

  useEffect(() => {
    const timerForSet = setInterval(() => {
      if (isPaused || scans.length === 0) {
        return;
      }
      roundCounterRef.current += 1;
      setScans([]);
      setScansBundleForCharts((prev) => [...prev.slice(-100), ...scans]);
      SubmitScans(experiment._id, scans);
      popToast.PopSuccessToast('Scans sent');
    }, timeoutInSeconds);
    return () => {
      clearInterval(timerForSet);
    };
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
