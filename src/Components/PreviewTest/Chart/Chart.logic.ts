// @ts-nocheck
import { IScan } from '../../../Types/Tests.Types';

const prepareData = (data : IScan[]) => {
  let currentRound = '-1';
  const dataSet = data.reduce((r, a) => {
    if (a.round !== currentRound.substring(' ')[0]) {
      currentRound = `${a.round}-|${a.elapsedTime ?? a.elpasedTime}|`;
    }
    // eslint-disable-next-line no-param-reassign
    r[currentRound] = r[currentRound] || [];
    r[currentRound].push(a);
    return r;
  }, Object.create(null));
  return {
    labels: Object.keys(dataSet),
    datasets: [
      {
        label: 'QC 2',
        data: Object.values(dataSet).map((RoundSet) => RoundSet.filter((Scan) => Scan.QC === '2').length),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'QC 3',
        data: Object.values(dataSet).map((RoundSet) => RoundSet.filter((Scan) => Scan.QC === '3').length),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'QC 4',
        data: Object.values(dataSet).map((RoundSet) => RoundSet.filter((Scan) => Scan.QC === '4').length),
        borderColor: 'rgb(62,235,102)',
        backgroundColor: 'rgba(105,235,53,0.5)',
      },
    ],
  };
};

export default {
  prepareData,
};
