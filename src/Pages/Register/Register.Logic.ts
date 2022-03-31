import { NavigateFunction } from 'react-router-dom';
import * as Yup from 'yup';
import Logger from '../../Utils/Logger/Logger.Logic';
import { createNewUser } from '../../services/User.services';

export const onSubmit = async (
  values: any,
  navigate: NavigateFunction,
  organizationDetails: string | undefined,
) => {
  try {
    if (organizationDetails) {
      await createNewUser({ ...values, email: values.email.toLowerCase(), organizationID: organizationDetails });
      navigate('/');
    } else {
      throw new Error('Organization was not  selected - try to refresh the page');
    }
  } catch (error) {
    Logger.Error('Email is already taken, please try other mail', { error });
  }
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
  phoneNumber: Yup.string().matches(rePhoneNumber, 'phone number must be valid in international format').required('phone Number is required'),
});
