import { Roles } from '.';

export interface User {
  uid: string;
  username?: string;
  email: string;
  emailVerified: boolean;
  accountType: string;
  createdAt: any;
  acceptTermsAndConditions: boolean;
  company?: string;
  roles: Roles;
}