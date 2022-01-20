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
import chartLogic from './Chart.logic';
import { IScan } from '../../../Types/Tests.Types';
import Card from '../../Card/Card';

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
  // aspectRatio: 1,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: "Qc's scan results",
    },
  },
};
const TestChart : FC<{ scans: IScan[] } & React.ReactNode> = ({ scans }) => {
  const [chartData] = useState(chartLogic.prepareData(scans));
  return (
    <Card w="100%">
      <Line data={chartData} options={options} />
    </Card>
  );
};

export default TestChart;
