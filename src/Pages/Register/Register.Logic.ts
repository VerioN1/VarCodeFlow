import { NavigateFunction } from 'react-router-dom';
import * as Yup from 'yup';

export const onSubmit = (
  values: any,
  navigate: NavigateFunction,
) => {
  navigate('/');
};
const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const initialValues = {
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};
export const validationSchema = Yup.object({
  password: Yup.string().required().min(6, 'Password must be at least 6 characters').max(20, 'Password must be less than 20 characters'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required').email(),
  phoneNumber: Yup.string().matches(rePhoneNumber, 'phone number must be valid in international format').required('Incubator Temperature is required'),
});
