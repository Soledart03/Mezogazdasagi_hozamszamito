import { Component,EventEmitter, Output,Input } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
@Component({
  selector: 'app-foldfelform',
  standalone: false,
  templateUrl: './foldfelform.html',
  styleUrl: './foldfelform.css',
})
export class Foldfelform {
ujfold = {terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',gazda_id:''}
  constructor(private gserv:Gazdaservice){}
  foldHozzaad():void{
    this.gserv.addFold(this.ujfold).subscribe({
      next:()=>{
        window.alert('Sikeres földhozzáadás!');
        this.ujfold = {terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',gazda_id:''}
        this.closeMenu();
      },
      error:(err)=>{
        console.log('Nem megy',this.ujfold.gazda_id)
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
