import React, {
  FC, memo, useEffect, useMemo, useState,
} from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import prepareData from './Chart.logic';
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
  maintainAspectRatio: false,
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
  const [isPending, setIsPending] = useState<boolean>(true);
  const [calcChartData, setChartData] = useState<any>([]);
  const chartData = useMemo(async () => prepareData(scans), [scans]);
  useEffect(() => {
    const test = async () => {
      const t = await chartData;
      // debugger;
      setChartData(t);
      setIsPending(false);
    };
    test();
  }, [scans]);

  return (
    <>
      { isPending ? (<p>Loading</p>) : (
        <Card w="100%">
          <Line data={calcChartData} options={options} height={14} width={20} />
        </Card>
      )}
    </>
  );
};

export default memo(TestChart);
