import { Component,EventEmitter, Output,Input  } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
@Component({
  selector: 'app-loginform',
  standalone: false,
  templateUrl: './loginform.html',
  styleUrl: './loginform.css',
})
export class Loginform {
  gazdak:any;
  ujgazd = {nev:'',email:'',jelszo:''}
  constructor(private gserv:Gazdaservice){}
  logcheck():void{
    this.gserv.logc(this.ujgazd).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.gserv.getGazda(res.id).subscribe(data=>{
          this.gazdak = data;
          window.alert('Sikeres Bejelentkezés');
        })
        console.log(res.id);
        
        this.closeMenu();
      },
      error:(err)=>{
        window.alert(err.error.error);
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
