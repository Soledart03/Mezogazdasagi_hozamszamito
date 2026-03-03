import { Component,EventEmitter, Output,Input, OnInit } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
import { Foldservice } from '../foldservice';
import { Observable } from 'rxjs';
import { AlertService } from '../alert-service';
@Component({
  selector: 'app-foldfelform',
  standalone: false,
  templateUrl: './foldfelform.html',
  styleUrl: './foldfelform.css',
})
export class Foldfelform implements OnInit {
  constructor(private gserv:Gazdaservice, private foldser:Foldservice,private alertSer: AlertService){}
  gazdaId: number;
  ngOnInit() {
    
    this.gserv.gazda$.subscribe(gazda => {
      this.gazdaId = gazda?.id ?? null;
    });
    
  }
  ujfold = {terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',gazda_id:0}
 
  foldHozzaad(){
    this.ujfold.gazda_id = this.gazdaId;
    console.log('MENTÉS ELŐTT:', this.ujfold);
    this.foldser.addFold(this.ujfold);
    this.alertSer.show('Föld hozzáadva!', 'success');
    this.ujfold = {terulet:'',muvelesi_ag:'',helyrajzi_szam:'',elozo_evi_hasznositas:'',gazda_id:0}
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
