import { Dict } from '../../Types/Utils.Types';
import popToast from '../../Components/Toasts/PopToast';

export default class Logger {
  public static Log(message: string, optionalParams: Dict<string>): void {
    console.log(message, optionalParams);
    if (optionalParams.toast) {
      popToast.PopInfoToast(message);
    }
  }

  public static Warn(message: string, optionalParams: Dict<string>): void {
    console.log(message, optionalParams);
  }

  public static Error(message: string, optionalParams: {error: any & Dict<string>}): void {
    popToast.PopErrorToast(message);
    if (import.meta.env.DEV || import.meta.env.PROD)console.log(optionalParams?.error);
  }
}
