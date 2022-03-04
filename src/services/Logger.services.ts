import customAxios from './axiox.config';

const sendLog = async (log: any) => {
  const { data } = await customAxios.loggedInAxios.post('/Logger', log);
  return data;
};
export default sendLog;
