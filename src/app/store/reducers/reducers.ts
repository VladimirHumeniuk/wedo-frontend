import {
  userReducer,
  alertReducer,
  loginReducer,
  adminReducer,
  categoriesReducer
} from '.';

export const reducers = {
  user: userReducer,
  alert: alertReducer,
  login: loginReducer,
  admin: adminReducer,
  category: categoriesReducer
}