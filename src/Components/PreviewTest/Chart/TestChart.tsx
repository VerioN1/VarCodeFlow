import React, {
  FC, memo, useEffect, useMemo, useState,
} from 'react';
import {
  CategoryScale,
  Chart,
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

const artbitryLine = {
  id: 'artbitryLine',
  beforeDraw(chart: Chart, args: { cancelable: true }, options: any) {
    const {
      ctx,
      chartArea: {
        top,
        right,
        height,
        width,
        left,
        bottom,
      },
      scales: {
        x,
        y,
      },
    } = chart;
    if (chart?.tooltip._active && chart?.tooltip._active.length) {
      ctx.save();
      const activePoint = chart.tooltip._active[0];
      if (activePoint.index > 10) {
        const jumps = Math.floor(activePoint.index / 10);
        for (let i = 1; i <= 10; i++) {
          ctx.strokeStyle = 'red';
          ctx.strokeRect(x.getPixelForValue(activePoint.index + (jumps * i)), top, 0, height);
          ctx.fillText(`${i * 10}%`, x.getPixelForValue(activePoint.index + (jumps * i)), (top + 20) * i ** 0.5);
          ctx.restore();
          ctx.strokeStyle = 'blue';
          ctx.strokeRect(x.getPixelForValue(activePoint.index - (jumps * i)), top, 0, height);
          ctx.fillText(`${i * 10}%`, x.getPixelForValue(activePoint.index - (jumps * i)), (top + 20) * i ** 0.5);
          ctx.restore();
        }
      }
      // chart.data.labels
      // ctx.beginPath();
      // ctx.setLineDash([5, 7]);
      // ctx.moveTo(activePoint.element.x, chart.chartArea.top);
      // ctx.lineTo(activePoint.element.x, activePoint.element.y);
      // ctx.lineWidth = 2;
      // ctx.strokeStyle = 'grey';
      // ctx.stroke();
      // ctx.restore();
      //
      // ctx.beginPath();
      // ctx.moveTo(activePoint.element.x, activePoint.element.y);
      // ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
      // ctx.lineWidth = 2;
      // ctx.stroke();
    }
  },
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  artbitryLine,
);
export const options = {
  // aspectRatio: 1,
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    artbitryLine: {
      xPosition: 3,
    },
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Qc\'s scan results',
    },
  },
};
const TestChart: FC<{ scans: IScan[] } & React.ReactNode> = ({ scans }) => {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [calcChartData, setChartData] = useState<any>([]);
  const chartData = useMemo(async () => prepareData(scans), [scans]);
  useEffect(() => {
    const test = async () => {
      const t = await chartData;
      setChartData(t);
      setIsPending(false);
    };
    test();
  }, [scans]);

  return (
    <>
      {isPending ? (<p>Loading</p>) : (
        <Card w="100%">
          <Line data={calcChartData} options={options} height={14} width={20} plugins={[artbitryLine]} />
        </Card>
      )}
    </>
  );
};

export default memo(TestChart);
