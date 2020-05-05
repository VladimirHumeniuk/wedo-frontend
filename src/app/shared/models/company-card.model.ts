import { PhoneNumber } from 'libphonenumber-js';
import { Category } from './category.model';

export interface CompanyCard {
  cid: string;
  title: string;
  owner: string;
  created: Date;
  image?: string;
  url?: string;
  phone?: PhoneNumber;
  category: number | string;
  email?: string;
  address?: string;
  wysiwyg?: string;
  shortDescription: string;
  isShown: boolean;
}