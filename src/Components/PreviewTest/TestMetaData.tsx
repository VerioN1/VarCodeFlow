import React, { FC } from 'react';
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { BiTestTube } from 'react-icons/bi';
import { FiType } from 'react-icons/fi';
import { BsCalendarDate } from 'react-icons/bs';
import { RiTempHotLine } from 'react-icons/ri';
import { GiProgression } from 'react-icons/gi';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import StatsCard from '../StatsCard/StatsCard';
import Card from '../Card/Card';
import { ITest } from '../../Types/Tests.Types';

const TestMetaData: FC<ITest & React.ReactNode> = ({
  activationDate,
  children,
  incubatorTemp,
  isTestInProgress,
  labelType,
  testName,
}) => (
  <Card>
    <Flex w="100%" borderBottom="1px solid" mb="1em">
      <Heading>Test Data</Heading>
    </Flex>
    <SimpleGrid columns={{ base: 3, xl: 5 }} spacing={{ base: 5, lg: 8 }}>
      <StatsCard title="Test Name" stat={testName} icon={<BiTestTube size="3em" />} />
      <StatsCard title="Test Label" stat={labelType} icon={<FiType size="3em" />} />
      <StatsCard title="Test Start Date" stat={activationDate ?? 'No Date'} icon={<BsCalendarDate size="3em" />} />
      <StatsCard title="Incubator Temp" stat={incubatorTemp.toString()} icon={<RiTempHotLine size="3em" />} />
      <StatsCard title="Test In Progress" stat={isTestInProgress ? 'Yes' : 'No'} icon={isTestInProgress ? <CgSpinnerTwoAlt size="3em" /> : <GiProgression size="3em" />} />
    </SimpleGrid>
    {children}
  </Card>
);

export default TestMetaData;
