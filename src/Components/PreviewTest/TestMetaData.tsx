import React, {
  FC, memo, useEffect, useState,
} from 'react';
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { BiTestTube } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import { RiTempHotLine } from 'react-icons/ri';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { MdDone, MdOutlineAccessTime } from 'react-icons/md';
import { differenceInSeconds } from 'date-fns';
import { IoIosTimer } from 'react-icons/io';
import StatsCard from '../StatsCard/StatsCard';
import Card from '../Card/Card';
import { IExperiment } from '../../Types/Tests.Types';

const TestMetaData: FC<IExperiment & React.ReactNode> = ({
  activationDate,
  children,
  incubatorTemp,
  isTestInProgress,
  labelType,
  _id,
  drumInterval,
  experimentName,
}) => {
  const [timePostStart, setTimePostStart] = useState('--:--:--');
  useEffect(() => {
    const timeElapsed = setInterval(() => {
      const seconds = differenceInSeconds(new Date(), new Date(activationDate));
      const hourseElapsed = Math.floor((seconds / 60) / 60).toString().padStart(2, '0');
      const minutesElapsed = Math.floor((seconds / 60) % 60).toString().padStart(2, '0');
      const secondsElapsed = Math.floor(seconds % 60).toString().padStart(2, '0');
      setTimePostStart(`${hourseElapsed}:${minutesElapsed}:${secondsElapsed}`);
    }, 1000);
    return () => clearInterval(timeElapsed);
  }, []);
  return (
    <Card>
      <Flex w="100%" borderBottom="1px solid" mb="1em">
        <Heading>
          Test ID
          {' '}
          {_id}
        </Heading>
      </Flex>
      <SimpleGrid columns={{ base: 3, '2xl': 6 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title="Test Name" stat={experimentName} icon={<BiTestTube size="3em" />} />
        <StatsCard title="Time elapsed since start" stat={timePostStart} icon={<IoIosTimer size="3em" />} />
        <StatsCard
          title="Test Start Date"
          textSize={{ base: 'lg', '2xl': '2xl' }}
          stat={activationDate ?? 'No Date'}
          icon={<BsCalendarDate size="3em" />}
        />
        <StatsCard
          title="Incubator Temp"
          stat={`${incubatorTemp?.toString()} °C`}
          icon={<RiTempHotLine size="3em" />}
        />
        <StatsCard
          title="Test Status"
          stat={isTestInProgress ? 'In Progress' : 'Finished'}
          icon={isTestInProgress ? <CgSpinnerTwoAlt className="icon-spin" size="3em" />
            : <MdDone size="3em" />}
        />
        <StatsCard
          title="Drum Interval"
          stat={`${drumInterval?.toString()}'s`}
          icon={<MdOutlineAccessTime size="3em" />}
        />
      </SimpleGrid>
      {children}
    </Card>
  );
};

export default memo(TestMetaData);
