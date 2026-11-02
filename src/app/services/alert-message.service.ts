import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AlertMessage {
  type: 'success' | 'error' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertMessageService {
  private messageSubject = new BehaviorSubject<AlertMessage | null>(null);
  message$ = this.messageSubject.asObservable();

  showMessage(message: string, type: 'success' | 'error' | 'warning') {
    this.messageSubject.next({ message, type });

    // Remover mensagem após 3 segundos
    setTimeout(() => {
      this.messageSubject.next(null);
    }, 3000);
  }
}
