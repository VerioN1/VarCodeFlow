import { finishExperiment } from '../../../../services/Experiments.services';
import popToast from '../../../../Components/Toasts/PopToast';
import Logger from '../../../../Utils/Logger/Logger.Logic';
import { TEST_IN_PROGRESS_COOKIE_NAME } from '../../../../Utils/Cookies/Cookies.constants';
import { deleteCookie } from '../../../../Utils/Cookies/CookiesHandler';

const submitTest = async (testId: string, testOtherFields: any, navigation: Function) => {
  try {
    const response = await finishExperiment(testId, testOtherFields);
    if (response) {
      popToast.PopSuccessToast('Test submitted successfully');
      navigation('/');
      deleteCookie(TEST_IN_PROGRESS_COOKIE_NAME);
    }
  } catch (e) {
    Logger.Error('Error while submitting test', { error: e });
  }
};

export default submitTest;
