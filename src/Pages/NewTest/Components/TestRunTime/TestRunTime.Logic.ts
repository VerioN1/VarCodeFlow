import { IScan } from '../../../../Types/Tests.Types';
import { submitScans } from '../../../../services/Experiments.services';
import Logger from '../../../../Utils/Logger/Logger.Logic';

const SubmitScans = async (testId: string, scans: IScan[]) => {
  try {
    await submitScans(testId, scans);
  } catch (e) {
    Logger.Error("error submiting test, results weren't saved", { error: e });
  }
};
export default SubmitScans;
