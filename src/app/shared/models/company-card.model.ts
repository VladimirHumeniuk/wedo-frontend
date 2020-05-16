import { PhoneNumber } from 'libphonenumber-js';
import { Category, Comment } from '.';

export interface CompanyCard {
  cid: string;
  title: string;
  owner: string;
  comments?: Comment[];
  created: any;
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