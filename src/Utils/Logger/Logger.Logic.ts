import axios from 'axios';
import { Dict } from '../../Types/Utils.Types';
import popToast from '../../Components/Toasts/PopToast';
import sendLog from '../../services/Logger.services';

export default class Logger {
  public static Log(message: string, optionalParams: Dict<string>): void {
    // console.log(message, optionalParams);
    if (optionalParams.toast) {
      popToast.PopInfoToast(message);
    }
  }

  public static Success(message: string): void {
    popToast.PopSuccessToast(message);
  }

  public static Warn(message: string, optionalParams: Dict<string>): void {
    console.log(message, optionalParams);
  }

  public static Error(message: string, optionalParams: {error: any & Dict<string>}): void {
    popToast.PopErrorToast(message);
    try {
      if (import.meta.env.DEV)console.log(optionalParams?.error);
      else if (axios.isAxiosError(optionalParams?.error)) {
        sendLog({ date: new Date(), userEmail: 'test@mail.com', message: `${message} ${JSON.stringify(optionalParams?.error?.response?.data)}` });
      } else sendLog({ date: new Date(), userEmail: 'test@mail.com', message: `${message} ${optionalParams?.error.toString()}` });
    } catch (e) {
      console.log("couldn't send log");
    }
  }
}
