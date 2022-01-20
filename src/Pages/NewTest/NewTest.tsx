import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import NewTestForm from './Components/NewTestForm/NewTestForm';
import { TEST_IN_PROGRESS_COOKIE_NAME } from '../../Utils/Cookies/Cookies.constants';
import TestRunTime from './Components/TestRunTime/TestRunTime';

const NewTest = () => {
  const InProgressTestCookie = useCookies([TEST_IN_PROGRESS_COOKIE_NAME])[0];
  const [isTestInProgress, setIsTestInProgress] = useState(false);

  useEffect(() => {
    // TODO: check if test is in progress and request it
    if (Object.keys(InProgressTestCookie).length !== 0) {
      if (InProgressTestCookie[TEST_IN_PROGRESS_COOKIE_NAME]?.isTestInProgress)
        setIsTestInProgress(true);
      else setIsTestInProgress(false);
      console.log(InProgressTestCookie[TEST_IN_PROGRESS_COOKIE_NAME]);
    }
  }, [InProgressTestCookie]);

  return (
    <Flex w="100%" minH="100%" flexDir="column" p="5%" align="center">
      {isTestInProgress
        ? <TestRunTime {...InProgressTestCookie[TEST_IN_PROGRESS_COOKIE_NAME]} />
        : <NewTestForm />}
    </Flex>
  );
};

export default NewTest;
