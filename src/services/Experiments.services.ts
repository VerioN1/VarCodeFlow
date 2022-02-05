import customAxios from './axiox.config';
import { IExperiment, IScan } from '../Types/Tests.Types';

export const createNewExperiment = async (experiment: IExperiment) => {
  const { data } = await customAxios.loggedInAxios.post('/Experiment', experiment);
  return data;
};
export const finishExperiment = async (experimentId: string, otherFields: any) => {
  const { data } = await customAxios.loggedInAxios.put(`/Experiment/${experimentId}/finish`, { ...otherFields });
  return data;
};
export const getExperiment = async (experimentId: string) => {
  const { data } = await customAxios.loggedInAxios.get(`/Experiment/${experimentId}`);
  console.log(data);
  return data;
};
export const submitScans = async (experimentId: string, scans: IScan[]) => {
  const { data } = await customAxios.loggedInAxios.post(`/Experiment/scans/${experimentId}`, { scans });
  return data;
};
export const getExperimentsForUser = async (userEmail : string) => {
  console.log(userEmail);
  const { data } = await customAxios.loggedInAxios.get(`/Experiment/${userEmail}/userExperiments`);
  console.log(data);
  return data;
};
