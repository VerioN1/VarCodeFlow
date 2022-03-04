import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import React from 'react';
import { login } from '../../Redux/reducers/auth.reducer';
import Logger from '../../Utils/Logger/Logger.Logic';
import { USER_TOKEN_FIELD } from '../../Utils/Cookies/Cookies.constants';
import { loginUser } from '../../services/User.services';
import { createCookie } from '../../Utils/Cookies/CookiesHandler';
import { AuthStatus } from '../../hooks/useAuth/useAuth.hook';

export const onSubmit = async (
  values: any,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction,
  setAuth: React.Dispatch<React.SetStateAction<AuthStatus>>,
) => {
  try {
    const res = await loginUser(values.email.toLowerCase(), values.password);
    console.log(res);
    dispatch(login(res.user));
    Logger.Log('Login Success', { userName: values.email, jwt: res.jwt });
    createCookie(USER_TOKEN_FIELD, res.jwt); // 2 days
    setAuth('loggedIn');
    navigate('/');
  } catch (err) {
    // @ts-ignore
    if (axios.isAxiosError(err) && err.response.status === 401) {
      // @ts-ignore
      Logger.Error('Login Failure - Email Or Password are not correct', { error: err, email: values.email });
    } else {
      // @ts-ignore
      Logger.Error('Login Failure', { email: values.email, error: err.toString() });
    }
  }
};

export const initialValues = {
  email: '',
  password: '',
};
export const validationSchema = Yup.object({
  email: Yup.string().required('User Name is required'),
  password: Yup.string().required(),
});
