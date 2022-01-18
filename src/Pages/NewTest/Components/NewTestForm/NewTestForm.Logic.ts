import * as Yup from 'yup';
import { format } from 'date-fns';
import { TEST_IN_PROGRESS_COOKIE_NAME } from '../../../../Utils/Cookies/Cookies.constants';
import Logger from '../../../../Utils/Logger/Logger.Logic';

export const CreateNewTest = (values : any, setCookie: any) => {
  try {
    const createNewTestData = { ...values, isTestInProgress: true };
    // service call
    setCookie(TEST_IN_PROGRESS_COOKIE_NAME, createNewTestData, { maxAge: 60 * 60 * 24 * 7 });
  } catch (e) {
    Logger.Error('Error in CreateNewTest', { error: 'error while creating a new test' });
  }
};

export const initialTestValues = {
  labelType: '',
  batchNum: '',
  boxNum: '',
  IncubatorTemp: 0,
  testDate: format(new Date(), 'yyyy-mm-dd hh:mm:ss'), // new to add machine number and volume CC to VARCODE employees
};
export const validationTestSchema = Yup.object({
  labelType: Yup.string().required('Set Label From Select Box'),
  batchNum: Yup.string().required('Please enter batch number'),
  boxNum: Yup.string().required('Box number is required'),
  testDate: Yup.date().required('Test Date is required'),
  IncubatorTemp: Yup.number().typeError('You must enter only numbers').required('Incubator Temperature is required'),
});
