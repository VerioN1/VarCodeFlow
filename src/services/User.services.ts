import customAxios from './axiox.config';
import { IUser } from '../Types/User.Types';
import { USER_TOKEN_FIELD } from '../Utils/Cookies/Cookies.constants';
import Logger from '../Utils/Logger/Logger.Logic';

export const createNewUser = async (user: any) => {
  const response = await customAxios.unknownUserAxios.post('/Auth/Register', user);
  Logger.Success('User created successfully');
  return response.data;
};

export const loginUser = async (email:string, password: string) => {
  const { data } = await customAxios.unknownUserAxios.post('/Auth/Login', {
    email,
    password,
  });
  localStorage.setItem(USER_TOKEN_FIELD, data.jwt);
  return data;
};

export const isTokenValid : () => Promise< IUser | boolean> = async () => {
  try {
    const { data } = await customAxios.loggedInAxios.get('/Auth/ValidToken');
    Logger.Log('Token is Valid ', { data });
    return data.user;
  } catch (e) {
    return false;
  }
};
