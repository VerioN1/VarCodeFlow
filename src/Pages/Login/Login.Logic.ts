import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { login } from '../../Redux/reducers/auth.reducer';
import Logger from '../../Utils/Logger/Logger.Logic';
import { USER_TOKEN_FIELD } from '../../Utils/Cookies/Cookies.constants';
import { loginUser } from '../../services/User.services';

export const onSubmit = async (
  values: any,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction,
  setUserCookie : any,
) => {
  try {
    const res = await loginUser(values.email, values.password);
    dispatch(login(res.user));
    Logger.Log('Login Success', { userName: values.email });
    setUserCookie(USER_TOKEN_FIELD, res.jwt, { maxAge: 172800 }); // 2 days
    // REQUIRED else there is a bug with authentication
    Logger.Log('Login Success', { userName: values.email });
    setTimeout(() => {
      navigate('/');
    }, 1000);
  } catch (err) {
    if (axios.isAxiosError(err)) {
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
