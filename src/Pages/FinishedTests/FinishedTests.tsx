import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { BsStack } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch/useFetch.hook';
import { getExperiment } from '../../services/Experiments.services';
import PreviewTest from '../../Components/PreviewTest/PreviewTest';
import { IExperiment } from '../../Types/Tests.Types';
import FetchWrapper from '../../Components/FetchWrapper/FetchWrapper';
import StatsCard from '../../Components/StatsCard/StatsCard';

const FinishedTests = () => {
  const { id } = useParams();
  const userData = useSelector((state: any) => state.userData);
  const state = useFetch<IExperiment>('finishedTest', () => getExperiment(id ?? 'error'));
  return (
    <FetchWrapper state={state}>
      {state.data
            && (
            <Flex w={{ base: '90%', xl: '70%' }} mt="1rem">
              <PreviewTest
                testMetaData={state.data}
                testScans={state.data.scans}
                metaDataChildren={(
                  <SimpleGrid columns={{ base: 3, '2xl': 6 }} spacing={{ base: 5, lg: 8 }} mt="0.9rem">
                    <StatsCard title="Finished on" textSize={{ base: 'lg', '2xl': '2xl' }} stat={`${state.data.deactivationDate?.toString()}`} icon={<BsStack size="3em" />} />
                    <StatsCard title="Organization" stat={`${state.data.experimentOrganization?.toString()}`} icon={<BsStack size="3em" />} />
                    {userData.tier !== 'user' && <StatsCard title="Manufacturing Date" stat={`${state.data.manufacturingDate?.toString()}`} icon={<BsStack size="3em" />} />}
                    {userData.tier !== 'user' && <StatsCard title="volume" stat={`${state.data.volume?.toString()}`} icon={<BsStack size="3em" />} />}
                    {userData.tier !== 'user' && <StatsCard title="Machine Number" stat={`${state.data.machineNum?.toString()}`} icon={<BsStack size="3em" />} />}
                    <StatsCard title="Owner" stat={`${state.data.experimentOwner?.toString()}`} />

                  </SimpleGrid>
                )}
              />
            </Flex>
            )}
    </FetchWrapper>
  );
};

export default FinishedTests;
