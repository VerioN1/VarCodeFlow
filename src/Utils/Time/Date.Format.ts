import { format, parse } from 'date-fns';

const formatDateAndTime = (date : Date) => format(date, 'LLL/dd/yyyy HH:mm');
const FormatDate = (date : Date) => format(date, 'LLL/dd/yyyy');

const stringToDateAndTime = (date: string) => parse(date, 'LLL/dd/yyyy HH:mm', new Date());
const stringToDate = (date: string) => parse(date, 'LLL/dd/yyyy', new Date());
export default {
  stringToDateAndTime,
  stringToDate,
  formatDateAndTime,
  FormatDate,
};
