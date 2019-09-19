import { PhoneNumber } from 'libphonenumber-js';

export interface CompanyCard {
  cid: string;
  title: string;
  owner: string;
  created: Date;
  image?: string;
  url?: string;
  phone?: PhoneNumber;
  category: string;
  email?: string;
  address?: string;
  wysiwyg?: string;
  isShown: boolean;
}