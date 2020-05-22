import { userReducer } from './user.reducer';
import { alertReducer } from './alert.reducer';
import { loginReducer } from './login.reducer';
import { adminReducer } from './admin.reducer';
import { categoriesReducer } from './categories.reducer';

export const reducers = {
  user: userReducer,
  alert: alertReducer,
  login: loginReducer,
  admin: adminReducer,
  category: categoriesReducer
}