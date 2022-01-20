import * as Yup from 'yup';
import { TEST_IN_PROGRESS_COOKIE_NAME } from '../../../../Utils/Cookies/Cookies.constants';
import Logger from '../../../../Utils/Logger/Logger.Logic';
import fd from '../../../../Utils/Time/Date.Format';

export const CreateNewTest = (values : any, setCookie: any) => {
  try {
    // implements Test Interface
    const createNewTestData = {
      ...values,
      testId: 123832, // TODO: generated in server
      isTestInProgress: true,
      activationDate: fd.formatDateAndTime(new Date()),
      manufacturingDate: fd.FormatDate(values.manufacturingDate),
    };
    // TODO: service call
    setCookie(TEST_IN_PROGRESS_COOKIE_NAME, createNewTestData, { maxAge: 60 * 60 * 24 * 7 });
  } catch (e : any) {
    Logger.Error('Error in CreateNewTest', { error: e });
  }
};

export const initialTestValues = {
  labelType: '',
  testName: '',
  batchNum: '',
  boxNum: '',
  manufacturingDate: fd.FormatDate(new Date()),
  incubatorTemp: 0, // TODO: add machine number and volume CC to VARCODE employees
};
export const validationTestSchema = Yup.object({
  labelType: Yup.string().required('Set Label From Select Box'),
  testName: Yup.string().required('Set Test Name'),
  batchNum: Yup.string().required('Please enter batch number'),
  boxNum: Yup.string().required('Box number is required'),
  manufacturingDate: Yup.date().required('Manufacturing Date is required'),
  incubatorTemp: Yup.number().typeError('You must enter only numbers').required('Incubator Temperature is required'),
});
