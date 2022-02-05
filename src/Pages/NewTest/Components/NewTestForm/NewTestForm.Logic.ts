import * as Yup from 'yup';
import Logger from '../../../../Utils/Logger/Logger.Logic';
import fd from '../../../../Utils/Time/Date.Format';
import { IUser } from '../../../../Types/User.Types';
import { createNewExperiment } from '../../../../services/Experiments.services';
import { TEST_IN_PROGRESS_COOKIE_NAME } from '../../../../Utils/Cookies/Cookies.constants';
import popToast from '../../../../Components/Toasts/PopToast';
import { IExperiment } from '../../../../Types/Tests.Types';

export const CreateNewTest = async (values : any, setCookie: any, userData: IUser) => {
  try {
    const createNewTestData = {
      ...values,
      isTestInProgress: true,
      incubatorTemp: Number(values.incubatorTemp),
      setSize: Number(values.setSize),
      volume: Number(values.volume),
      activationDate: fd.formatDateAndTime(new Date()),
      manufacturingDate: fd.FormatDate(values.manufacturingDate),
      experimentOwner: userData.email,
      scans: [],
      experimentOrganization: userData.organization?.organizationName,
    };
    const testObj : IExperiment = await createNewExperiment(createNewTestData);
    Logger.Log('Test created successfully', { newTest: testObj.experimentOwner });
    // eslint-disable-next-line no-underscore-dangle
    setCookie(TEST_IN_PROGRESS_COOKIE_NAME, testObj._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
    popToast.PopSuccessToast('Test created successfully!');
    window.location.reload();
  } catch (e : any) {
    Logger.Error('Error while creating New Test', { error: e });
  }
};

export const initialTestValues = {
  labelType: '',
  experimentName: '',
  batchNum: '',
  boxNum: '',
  manufacturingDate: new Date(),
  incubatorTemp: 0, // TODO: add machine number and volume CC to VARCODE employees
  setSize: 10,
  machineNum: 'null',
  volume: 'null',
};
export const validationTestSchema = Yup.object({
  labelType: Yup.string().required('Set Label From Select Box'),
  experimentName: Yup.string().required('Set Test Name'),
  batchNum: Yup.string().required('Please enter batch number'),
  boxNum: Yup.string().required('Box number is required'),
  setSize: Yup.number().required('Set Size is required').positive('Size Of Drum can only be a positive number').integer('Set Size must be an integer'),
  manufacturingDate: Yup.date().required('Manufacturing Date is required'),
  incubatorTemp: Yup.number().typeError('You must enter only numbers').required('Incubator Temperature is required'),
  machineNum: Yup.string(),
  volume: Yup.string(),
});
