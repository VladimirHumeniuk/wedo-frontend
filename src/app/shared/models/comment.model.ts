interface Vote {
  value: boolean;
}

export interface Comment {
  id?: string;
  date?: any;
  text?: string;
  author?: {
    uid: string;
    username: string;
  };
  isEdited?: boolean;
  rating?: number;
  answer?: {
    date?: any;
    text?: string;
    isEdited?: boolean;
  };
  votes?: Vote[]
}