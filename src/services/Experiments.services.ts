import customAxios from './axiox.config';
import { IExperiment, IScan } from '../Types/Tests.Types';
import fd from '../Utils/Time/Date.Format';

type ArgsUpdateExp = {
  [key: string]: string
}

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
  return data;
};
export const submitScans = async (experimentId: string, scans: IScan[]) => {
  const { data } = await customAxios.loggedInAxios.post(`/Experiment/scans/${experimentId}`, { scans });
  return data;
};
export const getExperimentsForUser = async (userEmail : string) => {
  const { data } = await customAxios.loggedInAxios.get(`/Experiment/${userEmail}/userExperiments`);
  return data;
};
export const resetExperimentActivationDate = async (experimentId: string) => {
  const { data } = await customAxios.loggedInAxios.put(`/Experiment/${experimentId}/ResetTimer`, { newActivationTime: fd.formatDateAndTime(new Date()) });
  return data;
};
export const updateExperimentDetails = async ({ experimentId, experimentName }: ArgsUpdateExp) => {
  console.log(experimentName);
  const { data } = await customAxios.loggedInAxios.put(`/Experiment/${experimentId}`, { experimentName });
  return data;
};
