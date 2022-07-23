import { serializeError } from 'serialize-error';
import { Dict } from '../../Types/Utils.Types';
import popToast from '../../Components/Toasts/PopToast';
import sendLog from '../../services/Logger.services';
import { getCookie } from '../Cookies/CookiesHandler';
import { USER_TOKEN_FIELD } from '../Cookies/Cookies.constants';

export default class Logger {
  public static Log(message: string, optionalParams: Dict<string>): void {
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
      if (import.meta.env.DEV) console.log(optionalParams?.error);
      else sendLog({ date: new Date(), userEmail: getCookie(USER_TOKEN_FIELD).email, message: serializeError(optionalParams.error) });
    } catch (e) {
      console.log("couldn't send log");
    }
  }
}
