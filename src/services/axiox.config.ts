import axios from 'axios';
import { USER_TOKEN_FIELD } from '../Utils/Cookies/Cookies.constants';

const TokenLessRequest = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV ?? 'error in env file',
  withCredentials: true,
});

const AuthenticatedRequest = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV ?? 'error in env file',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_FIELD) ?? 'null'}`,
  },
  withCredentials: true,
});

AuthenticatedRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(await error.response.data);
    if (error.response.status === 401) {
      localStorage.removeItem(USER_TOKEN_FIELD);
      // window.location.replace('/Logout');
    }
    return Promise.reject(error);
  },
);

export default {
  unknownUserAxios: TokenLessRequest,
  loggedInAxios: AuthenticatedRequest,
};
