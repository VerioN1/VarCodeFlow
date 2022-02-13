import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
// @ts-ignore
import { ExportJsonCsv } from 'react-export-json-csv';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { MdTimerOff } from 'react-icons/md';
import { GiBackwardTime, GiOrganigram } from 'react-icons/gi';
import { FaMountain } from 'react-icons/fa';
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
  const headers = useCallback(() => [
    {
      key: 'date',
      name: 'Scan TimeStamp',
    },
    {
      key: 'barCode',
      name: 'Scanned Code',
    },
    {
      key: 'round',
      name: 'Scan Round',
    },
  ], []);
  return (
    <FetchWrapper state={state}>
      {state.data
            && (
            <Flex w={{ base: '90%', xl: '70%' }} mt="1rem">
              <PreviewTest
                testMetaData={state.data}
                testScans={state.data.scans.slice(-300)}
                metaDataChildren={(
                  <SimpleGrid columns={{ base: 3, '2xl': 6 }} spacing={{ base: 5, lg: 8 }} mt="0.9rem">
                    <StatsCard title="Finished on" textSize={{ base: 'lg', '2xl': '2xl' }} stat={`${state.data.deactivationDate?.toString()}`} icon={<MdTimerOff size="3em" />} />
                    <StatsCard title="Organization" stat={`${state.data.experimentOrganization?.toString()}`} icon={<GiOrganigram size="3em" />} />
                    {userData.tier !== 'user' && <StatsCard title="Manufacturing Date" stat={`${state.data.manufacturingDate?.toString()}`} icon={<GiBackwardTime size="3em" />} />}
                    {userData.tier !== 'user' && <StatsCard title="volume" stat={`${state.data.volume?.toString()}`} icon={<FaMountain size="3em" />} />}
                    {userData.tier !== 'user' && <StatsCard title="Machine Number" stat={`${state.data.machineNum?.toString()}`} icon={<AiOutlineFieldNumber size="3em" />} />}
                    <StatsCard title="Owner" textSize={{ base: 'lg', '2xl': '2xl' }} stat={`${state.data.experimentOwner?.toString()}`} />
                    <ExportJsonCsv className="exportToExcelButton" fileTitle={`${state.data.experimentName}-${state.data._id}.csv`} headers={headers()} items={state.data.scans}>Export To Excel</ExportJsonCsv>
                  </SimpleGrid>
                )}
              />
            </Flex>
            )}
    </FetchWrapper>
  );
};

export default FinishedTests;
