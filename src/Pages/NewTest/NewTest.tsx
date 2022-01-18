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
    if (Object.keys(InProgressTestCookie).length !== 0) {
      // eslint-disable-next-line max-len
      if (InProgressTestCookie[TEST_IN_PROGRESS_COOKIE_NAME]?.isTestInProgress) setIsTestInProgress(true);
      else setIsTestInProgress(false);
    }
  }, [InProgressTestCookie]);

  return (
    <Flex w="100%" minH="100%" flexDir="column" p="5%" align="center">
      {isTestInProgress ? <TestRunTime /> : <NewTestForm />}
    </Flex>
  );
};

export default NewTest;
