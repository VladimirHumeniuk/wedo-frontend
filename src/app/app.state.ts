import { User, Login } from './shared/models';
import { AlertState } from 'src/app/store/states/alert.state';
import { AdminState } from 'src/app/store/states/admin.state';
import { CategoriesState } from 'src/app/store/states/categories.state';
import { CommentState } from 'src/app/store/states/comment.state';

export interface AppState {
  user: User;
  alert: AlertState;
  login: Login;
  admin: AdminState;
  category: CategoriesState;
  comment: CommentState
}