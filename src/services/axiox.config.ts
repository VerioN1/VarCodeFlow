import axios from 'axios';
import { USER_TOKEN_FIELD } from '../Utils/Cookies/Cookies.constants';
import { getCookie } from '../Utils/Cookies/CookiesHandler';

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
  },
  withCredentials: true,
});

AuthenticatedRequest.interceptors.request.use((config) => {
  // @ts-ignore
  if (config?.url.includes('/Auth/Login')) {
    return config;
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${(localStorage.getItem(USER_TOKEN_FIELD) || getCookie(USER_TOKEN_FIELD)) ?? 'null'}`,
    },
  };
});
AuthenticatedRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(await error.response.data);
    if (error.response.status === 401) {
      // localStorage.removeItem(USER_TOKEN_FIELD);
      // deleteCookie(USER_TOKEN_FIELD);
    }
    return Promise.reject(error);
  },
);

export default {
  unknownUserAxios: TokenLessRequest,
  loggedInAxios: AuthenticatedRequest,
};
