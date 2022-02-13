import React, { memo } from 'react';
import {
  Flex, Table, TableCaption, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch/useFetch.hook';
import { getExperimentsForUser } from '../../services/Experiments.services';
import { IExperiment } from '../../Types/Tests.Types';
import FetchWrapper from '../../Components/FetchWrapper/FetchWrapper';

const TestsHistory = () => {
  const userData = useSelector((state: any) => state.userData);
  const state = useFetch<IExperiment[]>('tests-history', () => getExperimentsForUser(userData.email));
  const navigate = useNavigate();

  return (
    <FetchWrapper state={state}>
      <Flex w="70%" pt="10%" h="50%" align="center" justify="center">
        <Table variant="simple" colorScheme="blue">
          <TableCaption>Those are all your recent tests</TableCaption>
          <Thead>
            <Tr>
              <Th>Experiment Date</Th>
              <Th>Experiment Start Date</Th>
              <Th>Is test Finished?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* @ts-ignore */}
            {state.data && state.data.map((item: IExperiment) => (
              <Tr
                key={item._id}
                _hover={{ cursor: 'pointer' }}
                onClick={() => (item.isTestInProgress ? navigate(`/NewTest/${item._id}`) : navigate(`/FinishedTest/${item._id}`))}
              >
                <Td>{item.experimentName}</Td>
                <Td>{item.activationDate}</Td>
                <Td>{item.isTestInProgress ? 'No' : 'Yes'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </FetchWrapper>
  );
};

export default memo(TestsHistory);
