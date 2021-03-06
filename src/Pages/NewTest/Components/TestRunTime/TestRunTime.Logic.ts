import { IExperiment, IScan } from '../../../../Types/Tests.Types';
import { resetExperimentActivationDate, submitScans } from '../../../../services/Experiments.services';
import Logger from '../../../../Utils/Logger/Logger.Logic';
import popToast from '../../../../Components/Toasts/PopToast';

const SubmitScans = async (testId: string, scans: IScan[]) => {
  try {
    await submitScans(testId, scans);
  } catch (e) {
    Logger.Error("error submiting test, results weren't saved", { error: e });
  }
};
export default SubmitScans;
export const onResetTimer = async (experiment: IExperiment) => {
  try {
    const isSureResetTimer = confirm('Are you sure you want to reset the timer?');
    if (isSureResetTimer) {
      await resetExperimentActivationDate(experiment._id);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      popToast.PopSuccessToast('Timer reset');
    }
  } catch (e) {
    Logger.Error("Can't reset timer", { error: e });
  }
};
