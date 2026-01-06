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

openMenu(type: any){
    this.app.openMenu(type);
  }

  
}
