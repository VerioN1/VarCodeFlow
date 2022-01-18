import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { login } from '../../Redux/reducers/auth.reducer';
import Logger from '../../Utils/Logger/Logger.Logic';
import { USER_TOKEN_COOKIE_NAME } from '../../Utils/Cookies/Cookies.constants';

export const onSubmit = (
  values: any,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction,
  setUserCookie : any,
) => {
  try {
    dispatch(login(values));
    // Service call
    Logger.Log('Login Success', { email: values.userName });
    setUserCookie(USER_TOKEN_COOKIE_NAME, values, { maxAge: 172800 }); // 2 days
    navigate('/');
  } catch (err) {
    if (axios.isAxiosError(err)) {
      Logger.Error('Login Failure', { email: values.email, error: err.toString() });
    } else {
      Logger.Error('Login Failure', { email: values.email, error: 'Logic Error' });
    }
  }
};

export const initialValues = {
  userName: '',
  password: '',
};
export const validationSchema = Yup.object({
  userName: Yup.string().required('User Name is required'),
  password: Yup.string().required(),
});
