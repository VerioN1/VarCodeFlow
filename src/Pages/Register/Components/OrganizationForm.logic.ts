import * as Yup from 'yup';
import Logger from '../../../Utils/Logger/Logger.Logic';
import { IOrganization } from '../../../Types/User.Types';
import { createNewOrganization } from '../../../services/User.services';

export const CreateOrganization = async (values : IOrganization) => {
  try {
    const createdOrgDetails = await createNewOrganization(values);
    if (!createdOrgDetails._id)
      throw new Error('id was not found in the new organization');
    setTimeout(() => {
      window.location.replace('/');
    }, 2300);
  } catch (e : any) {
    Logger.Error('Error in NewOrganization Creation', { error: e });
  }
};
const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const initialOrganizationValues = {
  contactName: '',
  organizationName: '',
  contactEmail: '',
  country: '',
  city: '',
  phoneNumber: '',
};
export const validationCreateOrgSchema = Yup.object({
  contactName: Yup.string().required('please set contact name'),
  contactEmail: Yup.string().required('email is required').email('Invalid email'),
  organizationName: Yup.string().required('please set Organization name'),
  country: Yup.string().required('please select country'),
  city: Yup.string().required('city number is required'),
  phoneNumber: Yup.string().matches(rePhoneNumber, 'phone number must be valid in international format like - +972 0541234567').required('Phone number is required'),
});
