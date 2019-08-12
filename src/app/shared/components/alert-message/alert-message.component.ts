import { Component, Input } from '@angular/core';
import { AlertsMessagesService } from './../../services/alerts-messages.service';
import { Alert } from './../../models/alert.model';

@Component({
  selector: 'wd-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {

  @Input() alert: Alert
  @Input() index: number

  constructor(
    private alertsMessageService: AlertsMessagesService
  ) {}

  public close(): void {
    this.alertsMessageService.removeAlert(this.index)
  }

}
