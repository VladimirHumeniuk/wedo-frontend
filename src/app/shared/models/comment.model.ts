import { Timestamp } from '.';

export interface Comment {
  date: Timestamp | Date;
  text: string;
  author: string;
  isEdited: boolean;
}