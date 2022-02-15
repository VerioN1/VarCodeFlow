import * as Yup from 'yup';
import Logger from '../../../../Utils/Logger/Logger.Logic';
import fd from '../../../../Utils/Time/Date.Format';
import { IUser } from '../../../../Types/User.Types';
import { createNewExperiment } from '../../../../services/Experiments.services';
import { TEST_IN_PROGRESS_COOKIE_NAME } from '../../../../Utils/Cookies/Cookies.constants';
import popToast from '../../../../Components/Toasts/PopToast';
import { IExperiment } from '../../../../Types/Tests.Types';
import { createCookie } from '../../../../Utils/Cookies/CookiesHandler';

export const CreateNewTest = async (values : any, userData: IUser) => {
  try {
    const createNewTestData = {
      ...values,
      isTestInProgress: true,
      incubatorTemp: Number(values.incubatorTemp),
      drumInterval: Number(values.drumInterval),
      volume: Number(values.volume),
      activationDate: fd.formatDateAndTime(new Date()),
      manufacturingDate: fd.FormatDate(values.manufacturingDate),
      experimentOwner: userData.email,
      scans: [],
      experimentOrganization: userData.organization?.organizationName,
    };
    const testObj : IExperiment = await createNewExperiment(createNewTestData);
    Logger.Log('Test created successfully', { newTest: testObj.experimentOwner });
    createCookie(TEST_IN_PROGRESS_COOKIE_NAME, testObj._id);
    popToast.PopSuccessToast('Test created successfully!');
    window.location.reload();
  } catch (e : any) {
    popToast.PopErrorToast('there has been an Error while trying to create your test!');
    Logger.Error('Error while creating New Test', { error: e });
  }
};

export const initialTestValues = {
  labelType: '',
  experimentName: '',
  batchNum: '',
  boxNum: '',
  manufacturingDate: new Date(),
  incubatorTemp: 0,
  drumInterval: 30,
  machineNum: '0',
  volume: 0,
};
export const validationTestSchema = Yup.object({
  labelType: Yup.string().required('Set Label From Select Box'),
  experimentName: Yup.string().required('Set Test Name'),
  batchNum: Yup.string().required('Please enter batch number'),
  boxNum: Yup.string().required('Box number is required'),
  drumInterval: Yup.number().required('Drum Interval is required').positive('Time can only be a positive number').integer('Time must be an integer'),
  manufacturingDate: Yup.date().required('Manufacturing Date is required'),
  incubatorTemp: Yup.number().typeError('You must enter only numbers').required('Incubator Temperature is required'),
  machineNum: Yup.string(),
  volume: Yup.number(),
});
