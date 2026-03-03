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
  gazdaHozzaad():void{
    this.gserv.addGazda(this.ujgazd).subscribe({
      next:()=>{
        this.alertSer.show('Sikeres Regisztráció!', 'success');
        
        this.ujgazd = {nev:'',email:'',jelszo:''};
        this.closeMenu();
      },
      error:(err)=>{
        this.alertSer.show('Sikertelen regisztráció!' + err.error.error, 'danger');
        

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
