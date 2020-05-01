import { User, Alert, Login } from './shared/models';
import { AlertState } from 'src/app/store/states/alert.state';

export interface AppState {
  readonly user: User;
  readonly alert: AlertState;
  readonly login: Login;
}
