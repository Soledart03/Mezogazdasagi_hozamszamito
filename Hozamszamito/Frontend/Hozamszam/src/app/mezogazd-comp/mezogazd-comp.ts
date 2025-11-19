import { Component } from '@angular/core';
import { Mezogazd } from '../mezogazd';
@Component({
  selector: 'app-mezogazd-comp',
  standalone: false,
  templateUrl: './mezogazd-comp.html',
  styleUrl: './mezogazd-comp.css',
})
export class MezogazdComp {
  adattarolo: any[] = [];
  adattarolo2: any[] = [];
  constructor(private serv: Mezogazd){}
  
 gazdatolt(): void {
  
  this.serv.getGazda().subscribe(data => {
    this.adattarolo = data;
  })
}
gazdafoldkiad(): void {
  
  this.serv.getgazdKiad().subscribe(data => {
    this.adattarolo2 = data;
  })
}
}
