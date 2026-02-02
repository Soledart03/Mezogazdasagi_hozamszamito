import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
import { Kiadasservice } from '../kiadasservice';
import { Foldservice } from '../foldservice';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-kiadasfelform',
  standalone: false,
  templateUrl: './kiadfelform.html',
  styleUrl: './kiadfelform.css',
})
export class Kiadasfelform implements OnInit {

  constructor(
    private gserv: Gazdaservice,
    private kiadasser: Kiadasservice,
    private foldserv: Foldservice
  ) {}
  fold$!: Observable<any[]>;
  foldek: any[] = [];
  kiadasok: any[] = [];

  gazdaId: number;

  ngOnInit() {
    console.log('kiadfelform');
    this.gserv.gazda$.subscribe(gazda => {
      this.gazdaId = gazda?.id ?? null;
    });
    this.foldserv.fold$.subscribe(folds => {
      this.fold$ = this.foldserv.fold$;
      this.foldek = folds;

      if (this.foldek.length === 0) return;
      /*
      const foldIds = this.foldek.map(f => f.id);

      this.kiadasser.loadKiadasByFoldIds(foldIds);
      */
    });
    this.kiadasser.kiadas$.subscribe(list => {
      this.kiadasok = list;
    });
  }

  ujKiadas = {
    datum: '',
    osszeg: null,
    tipus: '',
    leiras: '',
    fold_id: null
  };

  kiadasHozzaad() {
    console.log('MENTÉS ELŐTT:', this.ujKiadas);
    this.kiadasser.addKiadas(this.ujKiadas).subscribe(() => {

      const foldIds = this.foldserv.getFold().map(f => f.id);
      /*
      this.kiadasser.loadKiadasByFoldIds(foldIds);
      */
       this.ujKiadas = {
        datum: '',
        osszeg: null,
        tipus: '',
        leiras: '',
        fold_id: null
      };
      this.closeMenu();
    }); 
      
     
  }

  @Input() IsMenu: boolean = false;
  @Input() show: boolean = true;
  @Output() close = new EventEmitter<void>();

  closeMenu() {
    this.show = false;
    this.close.emit();
  }
}