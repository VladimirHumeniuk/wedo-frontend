import { PhoneNumber } from 'libphonenumber-js';

export interface CompanyCard {
  title: string;
  owner: string;
  image?: string;
  url?: string;
  phone?: PhoneNumber;
  category: string;
  email?: string;
  address?: string;
  wysiwyg?: string;
  isShown: boolean;
}