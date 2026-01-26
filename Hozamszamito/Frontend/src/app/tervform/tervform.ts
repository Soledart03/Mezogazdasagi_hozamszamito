import { Component, OnInit } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
import { Foldservice } from '../foldservice';
import { EventEmitter, Input, Output } from '@angular/core';
import { Tervservice } from '../tervservice';
@Component({
  selector: 'app-tervform',
  standalone: false,
  templateUrl: './tervform.html',
  styleUrl: './tervform.css',
})
export class Tervform implements OnInit {


  constructor( private tervserv:Tervservice,private foldserv:Foldservice, private gazdaser:Gazdaservice){}
  foldId: number;
  gazdaId: number;
  selectedOptionId: number | null = null;
  foldek: any = [];
  novenyek: any = [];
  szurtmagok:any = [];
  vetomagok:any = [];
  mutragyak:any = [];
  ngOnInit() {
      this.gazdaser.gazda$.subscribe(gazda => {
    this.gazdaId = gazda?.id ?? 0;

    if (this.gazdaId !== 0) {
      this.foldserv.loadFoldsByGazdaId(this.gazdaId);
    }

    console.log('gazdaId:', this.gazdaId);
  });

    this.foldserv.fold$.subscribe(folds => {
    this.foldId = folds?.[0]?.id ?? 0;
  });
    this.foldserv.getFoldida(this.gazdaId).subscribe(folds => {
    this.foldek = folds;
    console.log('folds:', this.foldek);
    if (this.foldek.length > 0) {
      const foldId = this.foldek[0].id;
      this.tervserv.loadTervByFold(foldId);
    }
  });
  this.tervserv.loadNoveny().subscribe(noveny => {
    this.novenyek = noveny;
  });
  this.tervserv.loadConnNovinp().subscribe(vetomag => {
    this.vetomagok = vetomag;
    
  });
  this.tervserv.loadMutragya().subscribe(mutragya => {
    this.mutragyak = mutragya;
    console.log('mutragya:',this.mutragyak);
  });
  }
  novnev = "";
  vetoszures(noveny:any){
    if (!this.vetomagok || this.vetomagok.length === 0) {
    console.warn('Vetőmagok még nincsenek betöltve');
    return;
  }
  console.log('VETOSZURES MENTÉS ELŐTT:',noveny);
  console.log('VETOSZURES MENTÉS ELŐTT:',this.vetomagok);
    this.szurtmagok = this.vetomagok.filter(
    (vm: any) => vm.nnev === noveny.nnev
  );
    console.log('MENTÉS ELŐTT:', this.szurtmagok);
  }

  ujterv = {fold_id:0,noveny_id:0,kiv_vetoid:0,kiv_mutrid:0,vetes_idopont:'',tomeg:0,osszeg:0}
  tervHozzaad(){
    this.ujterv.fold_id = this.foldId;
    console.log('MENTÉS ELŐTT:', this.ujterv);
    this.tervserv.addTerv(this.ujterv);
    this.ujterv = {fold_id:0,noveny_id:0,kiv_vetoid:0,kiv_mutrid:0,vetes_idopont:'',tomeg:0,osszeg:0}
    this.closeMenu();
  }
  @Input()IsMenu: boolean = false;
  @Input()show:boolean = true;
  @Output() close = new EventEmitter<void>();
  closeMenu(){
    this.show = false;
    this.close.emit();
  }
}

