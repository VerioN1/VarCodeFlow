import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { StateType } from '../../hooks/useFetch/useFetch.hook';
import ErrorPage from './ErrorPage';
import Loader from './Loader';

const FetchWrapper = ({ state, children, shouldRenderError = true } : {shouldRenderError?: boolean, state: StateType<any>, children: React.ReactNode}) => {
  if (state.status === 'loading' || state.status === 'idle') {
    return <Loader />;
  }
  if (state.status === 'failed' && shouldRenderError) {
    return (
      <Flex justify="center" align="center" flexDir="column" pb="10%">
        <ErrorPage />
        <Heading>We Couldn&apos;t Fetch your Data</Heading>
      </Flex>
    );
  }

  return (
    <>
      {children}
    </>
  );
};

export default FetchWrapper;
