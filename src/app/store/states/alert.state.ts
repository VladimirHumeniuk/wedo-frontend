import { Alert } from 'src/app/shared/models';

export class AlertState {
    public alerts: Alert[];

    constructor() {
        this.alerts = [];
    }
}