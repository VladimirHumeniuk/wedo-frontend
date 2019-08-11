export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  accountType: string;
  acceptTermsAndConditions: boolean;
}