import { Component,OnInit } from '@angular/core';
import { App } from '../app';
import { Gazdaservice } from '../gazdaservice';
import { Tervservice } from '../tervservice';
import { Observable } from 'rxjs';
import { Foldservice } from '../foldservice';

@Component({
  selector: 'app-terv',
  standalone: false,
  templateUrl: './terv.html',
  styleUrl: './terv.css',
})
export class Terv {
constructor(private app:App,private gazdaser:Gazdaservice,private tervser:Tervservice,private foldser:Foldservice){}
terv$!: Observable<any[]>;
folds$!: Observable<any[]>;
foldId: number = 0;
gazdaId: number = 0;
terv:any = {id:0,fold_id:0,noveny_id:0,vetes_idopont:'',tomeg:0,osszeg:0}
fold:any = {id:0,terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',g_id:0};
editing:boolean=false;
ngOnInit() {
  this.folds$ = this.foldser.fold$;

  this.gazdaser.gazda$.subscribe(gazda => {
    this.gazdaId = gazda?.id ?? 0;

    if (this.gazdaId !== 0) {
      this.foldser.loadFoldsByGazdaId(this.gazdaId);
    }

    console.log('gazdaId:', this.gazdaId);
  });

  this.foldser.fold$.subscribe(folds => {
    this.foldId = folds?.[0]?.id ?? 0;
    console.log('foldId:', this.foldId);
  });
}
selectedTerv: any = null;

openEdit(terv: any) {
  
  this.selectedTerv = { ...terv };
  this.editing = true;
}
/*
delTerv(terv: any) {
  this.tervser.deleteTerv(terv.id);
  this.tervser.loadTervByFold(this.gazdaId);
  window.alert("Tervezet törölve!")
}

  save() {
  this.tervser.updateTerv(this.selectedTerv);
  this.editing = false;
}
cancel() {
  this.editing = false;
  this.tervser.loadTervByFold(this.gazdaId);
}
  */
openMenu(type: any){
    this.app.openMenu(type);
  }

}
