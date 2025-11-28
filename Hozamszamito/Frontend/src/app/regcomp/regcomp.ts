import { Component,EventEmitter, input, Output,Input } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
@Component({
  selector: 'app-regcomp',
  standalone: false,
  templateUrl: './regcomp.html',
  styleUrl: './regcomp.css',
})
export class Regcomp {
  gazdak:any[]=[];
  ujgazd = {nev:'',email:'',jelszo:''}
  constructor(private gserv:Gazdaservice){}
  gazdaHozzaad():void{
    this.gserv.addGazda(this.ujgazd).subscribe(gazd=>{
      this.gazdak.push(gazd);
      this.ujgazd = {nev:'',email:'',jelszo:''};
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
