import { Component, Input } from '@angular/core';
import { AlertMessage, AlertMessageService } from '../services/alert-message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  alertMessage: AlertMessage | null = null;

  constructor(private alertService: AlertMessageService) {
    this.alertService.message$.subscribe((message) => {
      this.alertMessage = message;
    });
  }
}