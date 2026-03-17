import { Component,EventEmitter, Output,Input  } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
import { Navbar } from '../navbar/navbar';
import { AlertService } from '../alert-service';
@Component({
  selector: 'app-loginform',
  standalone: false,
  templateUrl: './loginform.html',
  styleUrl: './loginform.css',
})
export class Loginform {
  public gazdak:any;
  
  ujgazd = {nev:'',email:'',jelszo:''}
  constructor(private gserv:Gazdaservice,private alertSer: AlertService){}
  logcheck(): void {
  if (!this.ujgazd.nev || !this.ujgazd.email || !this.ujgazd.jelszo) {
    this.alertSer.show('Minden mezőt tölts ki!', 'warning');
    return;
  }

  this.gserv.logc(this.ujgazd).subscribe({
    next: (res) => {
      this.gserv.getGazda(res.id).subscribe(data => {
        const gazda = data[0];
        this.gserv.setGazdaData(gazda);
        this.alertSer.show('Sikeres bejelentkezés!', 'success');
      });
      this.closeMenu();
    },
    error: (err) => {
      const uzenet = err?.error?.error || 'Szerver nem elérhető';
      this.alertSer.show('Hiba: ' + uzenet, 'danger');
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
