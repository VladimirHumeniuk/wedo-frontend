import { Alert } from '../models/alert.model';

export const ALERTS: {[type: string]: {[code: string]: Alert}} = {
  user: {
    'email-not-verified': {
      message: "Your email address has not been verified. Verify your email address to use all the features of the application.",
      status: "danger",
      adviseUrl: "/"
    }
  }
}