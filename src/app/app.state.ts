import { User, Alert } from './shared/models';

export interface AppState {
  readonly user: User;
  readonly alert: Alert[];
}