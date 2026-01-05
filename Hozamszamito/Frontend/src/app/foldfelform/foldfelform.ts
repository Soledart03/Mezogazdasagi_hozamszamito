import { Component,EventEmitter, Output,Input, OnInit } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
import { Foldservice } from '../foldservice';
@Component({
  selector: 'app-foldfelform',
  standalone: false,
  templateUrl: './foldfelform.html',
  styleUrl: './foldfelform.css',
})
export class Foldfelform implements OnInit {
  constructor(private gserv:Gazdaservice, private foldser:Foldservice){}
  gazdaId: number;
  ngOnInit() {
    
    this.gserv.gazda$.subscribe(gazda => {
      this.gazdaId = gazda?.id ?? null;
    });
    
  }
  ujfold = {terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',gazda_id:0}
  
  foldHozzaad():void{
    this.ujfold.gazda_id = this.gazdaId;
    this.foldser.addFold(this.ujfold).subscribe({
      next:()=>{
        window.alert('Sikeres földhozzáadás!');
        this.ujfold = {terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',gazda_id:0}
        
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
