import {Alert} from 'src/app/shared/models';

export class AlertState {
    alerts: Alert[];

    constructor() {
        this.alerts = [];
    }
}