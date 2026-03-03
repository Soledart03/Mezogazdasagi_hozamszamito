import { Component } from '@angular/core';
import { AlertService } from '../alert-service';

@Component({
  selector: 'app-alert',
  standalone:false,
  template: `
    <div *ngIf="alertSer.alert$ | async as alert"
         class="alert-toast"
         [ngClass]="'alert-' + alert.type">
      {{ alert.message }}
    </div>
  `,
  styles: [`
    .alert-toast {
      position: fixed;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      padding: 16px 32px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 500;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      animation: fadeIn 0.3s ease;
    }
    .alert-success { background-color: #d4edda; color: #2e7d4f; border: 1px solid #a8d5b5; }
    .alert-danger  { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .alert-warning { background-color: #fff3cd; color: #856404; border: 1px solid #ffeeba; }
    .alert-info    { background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
    @keyframes fadeIn { from { opacity: 0; top: 10px; } to { opacity: 1; top: 30px; } }
  `]
})
export class AlertComponent {
  constructor(public alertSer: AlertService) {}
}