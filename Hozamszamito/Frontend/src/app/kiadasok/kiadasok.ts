import { Component, OnInit } from '@angular/core';
import { App } from '../app';
import { Foldservice } from '../foldservice';
import {combineLatest, Observable } from 'rxjs';
import { Kiadasservice } from '../kiadasservice';
import { Gazdaservice } from '../gazdaservice';
import { filter } from 'rxjs/operators';

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
    foldek: any[] = [];
  kiadasok: any[] = [];
  szurtkiadasok: any[] = [];
  ngOnInit(){
  

    this.gazdaser.gazda$.subscribe(gazda => {
      this.gazdaId = gazda?.id ?? 0;

      if (this.gazdaId !== 0) {
        this.foldser.loadFoldsByGazdaId(this.gazdaId);
      }

      console.log('gazdaId:', this.gazdaId);
    });
     this.foldser.fold$.subscribe(folds => {
    this.foldek = folds ?? [];
    console.log('folds:', this.foldek);

    // Ha vannak földek, hívjuk a service metódust a kiadások szűrésére
    if (this.foldek.length > 0) {
      const foldIds = this.foldek.map(f => Number(f.id));
      this.kiadser.loadKiadasByFoldIds(foldIds); // 🔹 Itt hívjuk a metódust
    }
  });

  // 3️⃣ Feliratkozunk a kiadásokra
  this.kiadser.kiadas$.subscribe(list => {
    this.kiadasok = list ?? [];
    console.log('szűrt kiadások:', this.kiadasok);
  });
  }

filterKiadasok(kiadasok: any[], foldek: any[]) {
  if (!kiadasok?.length || !foldek?.length) return [];

  return kiadasok.filter(k =>
    foldek.some(f => Number(f.id) === Number(k.fold_id))
  );
}
getHelyrazji(kiad:any){
  return this.foldek.find((f:any) => f.id === kiad.fold_id)

}

openMenu(type: any){
  this.app.openMenu(type);
}

}
