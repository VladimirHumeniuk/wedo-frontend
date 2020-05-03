import { User, Login } from './shared/models';
import {AlertState} from 'src/app/store/states/alert.state';
import {AdminState} from 'src/app/store/states/admin.state';

export interface AppState {
  readonly user: User;
  readonly alert: AlertState;
  readonly login: Login;
  readonly admin: AdminState
}