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
terv:any = {id:0,fold_id:0,noveny_id:0,kiv_vetoid:0,kiv_mutrid:0,vetes_idopont:'',tomeg:0,osszeg:0}
fold:any = {id:0,terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',g_id:0};
foldek:any = [];
novenyek:any = [];
vetomagok:any = [];
mutragyak:any = [];
mutrvane = false;
flood:any = [];
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
    
    
  });
  this.foldser.getFoldida(this.gazdaId).subscribe(folds => {
    this.foldek = folds;
    console.log('folds:', this.foldek);
    if (this.foldek.length > 0) {
      const foldId = this.foldek[0].id;
      this.tervser.loadTervByFold(foldId);
    }
  });
  this.tervser.loadNoveny().subscribe(noveny => {
    this.novenyek = noveny;
  });
  this.tervser.loadConnNovinp().subscribe(vetomag => {
    this.vetomagok = vetomag;
    console.log('vetomag:',this.vetomagok);
  });
  this.tervser.loadMutragya().subscribe(mutragya => {
    this.mutragyak = mutragya;
    console.log('mutragya:',this.mutragyak);
  });
  
  this.terv$ = this.tervser.terv$;
  
}
selectedTerv: any = null;
getFold(terv: any) {
  return this.foldek.find(
    (f: any) => f.id === terv.fold_id
  );
}
getKivVetomag(terv: any) {
  return this.vetomagok.find(
    (f: any) => f.iad === terv.kiv_vetoid
  );
}
getVetomag(terv: any) {
  return this.vetomagok.find(
    (f: any) => f.id === terv.fold_id
  );
}
vanegMutragya(terv: any) {
  let kivmutr = this.mutragyak.find(
    (f: any) => f.id === terv.kiv_mutrid
  );
  if(kivmutr != null){
    this.mutrvane = true;
  }
} 
getKivMutragya(terv: any) {
  return this.mutragyak.find(
    (f: any) => f.id === terv.kiv_mutrid
  );
}

getNoveny(terv: any) {
  return this.novenyek.find(
    (n: any) => n.id === terv.noveny_id
  );
}
Vegosszeg(terv:any){
  
}
/*
getFirstnovinp(terv:any){
  return this.vetomagok.find(
    (n: any) => n.id === terv.noveny_id
  );
}
  */
 
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
