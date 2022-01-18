import React, { FC, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';
import chartLogic from './Chart.logic';
import { IScan } from '../../../Types/Tests.Types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
const TestChart : FC<{ scans: IScan[] } & React.ReactNode> = ({ scans }) => {
  const [chartData] = useState(chartLogic.prepareData(scans));
  console.log(chartData);
  return (
    <Flex w="100%">
      <Line data={chartData} options={options} />
    </Flex>
  );
};

export default TestChart;
