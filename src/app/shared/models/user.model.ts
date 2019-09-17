export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  accountType: string;
  createdAt: Date;
  acceptTermsAndConditions: boolean;
  company?: string;
}