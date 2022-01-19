// @ts-nocheck
// eslint-disable
import { differenceInMinutes, format, parse } from 'date-fns';
import { IScan } from '../../../Types/Tests.Types';

const prepareData = (data : IScan[]) => {
  const barCodeSubstring = (str : string) => str.substring(
    0,
    str.length - 1,
  );
  let lastDate : string = '';
  const groupBy = (arr : IScan[]) => arr.reduce((memo, x) => {
    // console.log(format(parse(x.date, 'MM/dd/yyyy HH:mm:ss', new Date()), 'MMddyyyyHHmmss'));
    if (lastDate.length === 0) {
      lastDate = format(parse(x.date, 'MM/dd/yyyy HH:mm:ss', new Date()), 'MM/dd/yyyy-HH:mm:ss').toString();
      console.log(lastDate);
      memo[lastDate] = [];
      return memo;
    }
    if (!memo[lastDate]) {
      memo[lastDate] = [];
      return memo;
    }
    if (differenceInMinutes(parse(lastDate, 'MM/dd/yyyy-HH:mm:ss', new Date()), parse(x.date, 'MM/dd/yyyy HH:mm:ss', new Date())) > 1) {
      lastDate = format(parse(x.date, 'MM/dd/yyyy HH:mm:ss', new Date()), 'MM/dd/yyyy-HH:mm:ss').toString();
      memo[lastDate] = [];
      return memo;
    }
    memo[lastDate].push(x.barCode[x.barCode.length - 1]);
    return memo;
  }, {});
  // const labels = Object.values(data.reduce((acc, cur) => Object.assign(acc, { [barCodeSubstring(cur.barCode)]: cur }), {}));
  const dataSet = groupBy(data);
  return {
    labels: Object.keys(dataSet),
    datasets: [
      {
        label: 'QC 2',
        data: Object.values(dataSet).map((QCs) => QCs.filter((QC) => QC === '2').length),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'QC 3',
        data: Object.values(dataSet).map((QCs) => QCs.filter((QC) => QC === '3').length),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'QC 4',
        data: Object.values(dataSet).map((QCs) => QCs.filter((QC) => QC === '4').length),
        borderColor: 'rgb(62,235,102)',
        backgroundColor: 'rgba(105,235,53,0.5)',
      },
    ],
  };
};

export default {
  prepareData,
};
