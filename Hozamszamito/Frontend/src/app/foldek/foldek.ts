import { Component,OnInit } from '@angular/core';
import { App } from '../app';
import { Gazdaservice } from '../gazdaservice';
@Component({
  selector: 'app-foldek',
  standalone: false,
  templateUrl: './foldek.html',
  styleUrl: './foldek.css',
})
export class Foldek implements OnInit {
constructor(private app:App,private gazdaser:Gazdaservice){}
foldek:any[]=[];
gazdaId: number;
ngOnInit() {
  
  this.gazdaser.gazda$.subscribe(gazda => {
    this.gazdaId = gazda?.id ?? null;
  });
  this.foldGetId();
}
openMenu(type: any){
    this.app.openMenu(type);
  }
foldGetId(){
  this.gazdaser.getFoldida(this.gazdaId).subscribe(data=>this.foldek=data)
}
  
}
