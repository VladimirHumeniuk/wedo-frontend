import { Component, Input } from '@angular/core';
import { AlertsMessagesService } from './../../services';
import { Alert } from './../../models';

@Component({
  selector: 'wd-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {

  @Input() alert: Alert
  @Input() index: number

  constructor(
    private readonly alertsMessageService: AlertsMessagesService
  ) {}

  public close(): void {
    this.alertsMessageService.removeAlert(this.alert.code)
  }
}
