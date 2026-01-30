import { Component, OnInit } from '@angular/core';
import { App } from '../app';
import { Foldservice } from '../foldservice';
import { Observable } from 'rxjs';
import { Kiadasservice } from '../kiadasservice';
import { Gazdaservice } from '../gazdaservice';


@Component({
  selector: 'app-kiadasok',
  standalone: false,
  templateUrl: './kiadasok.html',
  styleUrl: './kiadasok.css',
})
export class Kiadasok implements OnInit{
  constructor(private app:App,private kiadser:Kiadasservice, private foldser:Foldservice, private gazdaser:Gazdaservice){}
  kiadasoks$!: Observable<any[]>;
  fold:any = {terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',id:0};
  editing:boolean=false;
  gazdaId: number=0;
  foldId: number=0;
  foldek:any = [];
  
  ngOnInit(){
    this.kiadasoks$ = this.kiadser.kiadas$;
    
  this.gazdaser.gazda$.subscribe(gazda => {
    this.gazdaId = gazda?.id ?? 0;

    if (this.gazdaId !== 0) {
      this.foldser.loadFoldsByGazdaId(this.gazdaId);
    }

    console.log('gazdaId:', this.gazdaId);
  });

  this.foldser.fold$.subscribe(folds => {
    this.foldId = folds?.[0]?.id ?? 0;
    
    
  });
  this.foldser.getFoldida(this.gazdaId).subscribe(folds => {
    this.foldek = folds;
    console.log('folds:', this.foldek);
    if (this.foldek.length > 0) {
      const foldId = this.foldek[0].id;
      this.kiadser.loadKiadasByFold(foldId);
      
    }
  });



  console.log(this.gazdaId);
  
  console.log(this.foldek);
  }

selectedFold: any = null;

openEdit(fold: any) {
  
  this.selectedFold = { ...fold };
  this.editing = true;
}
openMenu(type: any){
    this.app.openMenu(type);
  }
getHelyrazji(kiad:any){
  return this.foldek.find((f:any) => f.id === kiad.fold_id)

}



}
