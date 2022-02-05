import React from 'react';
import {
  Flex, Table, TableCaption, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import useFetch from '../../hooks/useFetch/useFetch.hook';
import { getExperimentsForUser } from '../../services/Experiments.services';
import { IExperiment } from '../../Types/Tests.Types';

const TestsHistory = () => {
  // @ts-ignore
  const state = useFetch<IExperiment[]>('tests-history', () => getExperimentsForUser(localStorage.getItem('email')));
  if (state.status === 'loading') return <div>Loading...</div>;
  if (state.status === 'failed') return <div>Failed to load data</div>;
  return (
    <Flex w="70%" pt="10%" h="50%" align="center" justify="center">
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Those are all your recent tests</TableCaption>
        <Thead>
          <Tr>
            <Th>Experiment Date</Th>
            <Th>Experiment Start Date</Th>
            <Th>Is test in progress</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* @ts-ignore */}
          {state.data && state.data.map((item: IExperiment) => (
            <Tr key={item._id}>
              <Td>{item.experimentName}</Td>
              <Td>{item.activationDate}</Td>
              <Td>{item.isTestInProgress ? 'Yes' : 'No'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default TestsHistory;
