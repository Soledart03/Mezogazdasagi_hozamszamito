import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new BehaviorSubject<{message: string, type: string} | null>(null);
  alert$ = this.alertSubject.asObservable();

  show(message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'success') {
    this.alertSubject.next({ message, type });
    setTimeout(() => this.alertSubject.next(null), 3000);
  }
}