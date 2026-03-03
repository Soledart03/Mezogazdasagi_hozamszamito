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
  logcheck():void{
    this.gserv.logc(this.ujgazd).subscribe({
      next:(res)=>{
        //console.log(res);
        
        this.gserv.getGazda(res.id).subscribe(data=>{
          
          const gazda = data[0];
          this.gserv.setGazdaData(gazda);
          this.alertSer.show('Sikeres Bejelentkezés', 'success');
        })
        //console.log(res.id);
        
        this.closeMenu();
      },
      error:(err)=>{
        this.alertSer.show("Hiba a bejelentkezéskor"+ err.error.error, 'danger');
        window.alert();
      }
    })
    
  }
  @Input()IsMenu: boolean = false;
  @Input()show:boolean = true;
  @Output() close = new EventEmitter<void>();
  closeMenu(){
    this.show = false;
    this.close.emit();
  }
  
}
