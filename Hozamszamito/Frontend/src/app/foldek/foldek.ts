import { Component,OnInit } from '@angular/core';
import { App } from '../app';
import { Gazdaservice } from '../gazdaservice';
import { Foldservice } from '../foldservice';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-foldek',
  standalone: false,
  templateUrl: './foldek.html',
  styleUrl: './foldek.css',
})
export class Foldek implements OnInit {
constructor(private app:App,private gazdaser:Gazdaservice,private foldser:Foldservice){}
folds$!: Observable<any[]>;
gazdaId: number = 0;
fold:any = {terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',id:0};
editing:boolean=false;
ngOnInit() {
  this.folds$ = this.foldser.fold$;
  this.gazdaser.gazda$.subscribe(gazda => {
    this.gazdaId = gazda?.id ?? null;
    
  });
  if (this.gazdaId != 0) {
      this.foldser.loadFoldsByGazdaId(this.gazdaId);
    } 
  
  this.foldser.fold$.subscribe(fold=>{
    this.gazdaId = fold?.[0]?.id ?? null;
  }) 
}
selectedFold: any = null;

openEdit(fold: any) {
  
  this.selectedFold = { ...fold };
  this.editing = true;
}
delfold(fold: any) {
  this.foldser.deleteFold(fold.id);
  this.foldser.loadFoldsByGazdaId(this.gazdaId);
  window.alert("Föld törölve!")
}
  save() {
  this.foldser.updateFold(this.selectedFold);
  this.editing = false;
}
cancel() {
  this.editing = false;
  this.foldser.loadFoldsByGazdaId(this.gazdaId);
}
openMenu(type: any){
    this.app.openMenu(type);
  }
}
