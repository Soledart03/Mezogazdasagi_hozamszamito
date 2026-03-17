import { Component,EventEmitter, Output,Input } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
import { AlertService } from '../alert-service';
@Component({
  selector: 'app-regcomp',
  standalone: false,
  templateUrl: './regcomp.html',
  styleUrl: './regcomp.css',
})
export class Regcomp {
  
  ujgazd = {nev:'',email:'',jelszo:''}
  constructor(private gserv:Gazdaservice,private alertSer: AlertService){}
  gazdaHozzaad(): void {
  if (!this.ujgazd.nev || !this.ujgazd.email || !this.ujgazd.jelszo) {
    this.alertSer.show('Minden mezőt tölts ki!', 'warning');
    return;
  }

  this.gserv.addGazda(this.ujgazd).subscribe({
    next: () => {
      this.alertSer.show('Sikeres regisztráció!', 'success');
      this.ujgazd = { nev: '', email: '', jelszo: '' };
      this.closeMenu();
    },
    error: (err) => {
      const uzenet = err?.error?.error || 'Szerver nem elérhető';
      this.alertSer.show('Sikertelen regisztráció! ' + uzenet, 'danger');
    }
  });
}
  @Input()IsMenu: boolean = false;
  @Input()show:boolean = true;
  @Output() close = new EventEmitter<void>();
  closeMenu(){
    this.show = false;
    this.close.emit();
  }
}
