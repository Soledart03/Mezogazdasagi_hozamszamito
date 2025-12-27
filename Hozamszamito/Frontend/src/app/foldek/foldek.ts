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
protected foldek:any[]=[];
ngOnInit(): void {
  this.foldGetId();
}
openMenu(type: any){
    this.app.openMenu(type);
  }
id:1;
foldGetId(){
  this.gazdaser.getFoldida(this.id).subscribe(data=>this.foldek=data)
}
  
}
