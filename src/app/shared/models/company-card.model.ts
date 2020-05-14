import { PhoneNumber } from 'libphonenumber-js';
import { Category, Timestamp, Comment } from '.';

export interface CompanyCard {
  cid: string;
  title: string;
  owner: string;
  comments?: Comment[];
  created: Timestamp | Date;
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