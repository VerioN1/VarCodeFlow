import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import NewTestForm from './Components/NewTestForm/NewTestForm';
import { TEST_IN_PROGRESS_COOKIE_NAME } from '../../Utils/Cookies/Cookies.constants';
import TestRunTime from './Components/TestRunTime/TestRunTime';
import useFetch from '../../hooks/useFetch/useFetch.hook';
import { getExperiment } from '../../services/Experiments.services';
import { IExperiment } from '../../Types/Tests.Types';
import { deleteCookie, getCookie } from '../../Utils/Cookies/CookiesHandler';

const NewTest = () => {
  const { testId } = useParams();
  const [isTestInProgress, setIsTestInProgress] = useState(false);
  const state = useFetch<IExperiment>('test-details', () => getExperiment(getCookie(TEST_IN_PROGRESS_COOKIE_NAME) ?? testId));
  useEffect(() => {
    if (state.status === 'succeeded') {
      // @ts-ignore
      setIsTestInProgress(state?.data?.isTestInProgress);
    }// @ts-ignore
    if (state.status === 'failed' && state.error.status === 403) {
      deleteCookie(TEST_IN_PROGRESS_COOKIE_NAME);
    }
    // @ts-ignore
    if (state.status === 'failed' && state.error.status === 404) {
      deleteCookie(TEST_IN_PROGRESS_COOKIE_NAME);
      window.location.reload();
    }
  }, [state.status]);
  if (state.status === 'loading') return <div>Loading...</div>;
  // @ts-ignore
  if (state.status === 'failed' && state.error.status !== 403) return <div>Error</div>;
  return (
    <Flex w="100%" minH="100%" flexDir="column" p="5%" align="center">
      {isTestInProgress
        ? <TestRunTime experiment={state.data as IExperiment} />
        : <NewTestForm />}
      {!isTestInProgress && <p>please create new Experiment or Choose from a finished one</p>}
    </Flex>
  );
};

export default NewTest;
