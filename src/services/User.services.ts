import customAxios from './axiox.config';
import { IUser } from '../Types/User.Types';
import { USER_TOKEN_FIELD } from '../Utils/Cookies/Cookies.constants';

export const loginUser = async (email:string, password: string) => {
  const { data } = await customAxios.unknownUserAxios.post('/Auth/Login', {
    email,
    password,
  });
  localStorage.setItem(USER_TOKEN_FIELD, data.jwt);
  return data;
};

export const isTokenValid : () => Promise< IUser | boolean> = async () => {
  const { data } = await customAxios.loggedInAxios.get('/Auth/ValidToken');
  console.log(data);
  return data.user;
};
