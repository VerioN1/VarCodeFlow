export type IOrganization = {
  _id?: string;
  contactName: string;
  contactEmail: string;
  organizationName: string;
  country: string;
  city: string;
  phoneNumber: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  tier: 'user' | 'admin' | 'owner';
  email: string;
  phoneNumber: string;
  organizationID: string;
}
