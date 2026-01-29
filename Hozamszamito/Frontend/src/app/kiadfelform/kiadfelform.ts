import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
import { Kiadasservice } from '../kiadasservice';

@Component({
  selector: 'app-kiadfelform',
  standalone: false,
  templateUrl: './kiadfelform.html',
  styleUrl: './kiadfelform.css',
})
export class Kiadasfelform implements OnInit {

  constructor(
    private gserv: Gazdaservice,
    private kiadasser: Kiadasservice
  ) {}

  gazdaId: number;

  ngOnInit() {
    this.gserv.gazda$.subscribe(gazda => {
      this.gazdaId = gazda?.id ?? null;
    });
  }

  ujKiadas = {
    datum: '',
    osszeg: null,
    tipus: '',
    leiras: '',
    fold_id: null,
    noveny_id: null,
    inputanyag_id: null
  };

  kiadasHozzaad() {
    console.log('MENTÉS ELŐTT:', this.ujKiadas);
    this.kiadasser.addKiadas(this.ujKiadas);

    this.ujKiadas = {
      datum: '',
      osszeg: null,
      tipus: '',
      leiras: '',
      fold_id: null,
      noveny_id: null,
      inputanyag_id: null
    };

    this.closeMenu();
  }

  @Input() IsMenu: boolean = false;
  @Input() show: boolean = true;
  @Output() close = new EventEmitter<void>();

  closeMenu() {
    this.show = false;
    this.close.emit();
  }
}