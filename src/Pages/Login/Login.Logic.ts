import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../Redux/reducers/auth.reducer';

export const onSubmit = (
  values: any,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction,
  setCookie : any,
) => {
  dispatch(login(values));
  setCookie('token', values, { maxAge: 172800 }); // 2 days
  navigate('/');
};

export const initialValues = {
  userName: '',
  password: '',
};
export const validationSchema = Yup.object({
  userName: Yup.string().required('User Name is required'),
  password: Yup.string().required(),
});
