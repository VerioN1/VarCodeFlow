import { NavigateFunction } from 'react-router-dom';
import * as Yup from 'yup';

export const onSubmit = (
  values: any,
  navigate: NavigateFunction,
) => {
  console.log(values);
  navigate('/');
};

export const initialValues = {
  userName: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};
export const validationSchema = Yup.object({
  userName: Yup.string().required('User Name is required'),
  password: Yup.string().required().min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required').email(),
  phoneNumber: Yup.number().typeError('You must enter only numbers').required('Phone Number is required'),
});
