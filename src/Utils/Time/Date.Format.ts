import { format } from 'date-fns';

const formatDateAndTime = (date : Date) => format(date, 'LLL/dd/yyyy HH:mm');
const FormatDate = (date : Date) => format(date, 'LLL/dd/yyyy');

export default {
  formatDateAndTime,
  FormatDate,
};
