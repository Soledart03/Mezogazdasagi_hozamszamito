import { Component,EventEmitter, Output,Input } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
@Component({
  selector: 'app-regcomp',
  standalone: false,
  templateUrl: './regcomp.html',
  styleUrl: './regcomp.css',
})
export class Regcomp {
  
  ujgazd = {nev:'',email:'',jelszo:''}
  constructor(private gserv:Gazdaservice){}
  gazdaHozzaad():void{
    this.gserv.addGazda(this.ujgazd).subscribe({
      next:()=>{
        window.alert('Sikeres Bejelentkezés');
        this.ujgazd = {nev:'',email:'',jelszo:''};
        this.closeMenu();
      },
      error:(err)=>{
        console.log('Nem megy',this.ujgazd.nev)
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
