import { Dict } from '../../Types/Utils.Types';

export default class Logger {
  public static Log(message: string, optionalParams: Dict<string>): void {
    console.log(message, optionalParams);
  }

  public static Warn(message: string, optionalParams: Dict<string>): void {
    console.log(message, optionalParams);
  }

  public static Error(message: string, optionalParams: Dict<string>): void {
    console.log(message, optionalParams);
  }
}
