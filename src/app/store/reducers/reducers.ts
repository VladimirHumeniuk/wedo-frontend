import {
  userReducer,
  alertReducer,
  loginReducer,
  adminReducer,
  categoriesReducer,
  commentReducer
} from '.';

export const reducers = {
  user: userReducer,
  alert: alertReducer,
  login: loginReducer,
  admin: adminReducer,
  category: categoriesReducer,
  comment: commentReducer,
}