import { User, Alert, Login } from './shared/models';

export interface AppState {
  readonly user: User;
  readonly alert: Alert[];
  readonly login: Login;
}