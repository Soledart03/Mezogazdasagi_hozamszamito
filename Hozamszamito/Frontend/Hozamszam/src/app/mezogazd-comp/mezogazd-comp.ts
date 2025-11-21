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
  adattarolo3: any[] = [];
  adattarolo4: any[] = [];
  adattarolo5: any[] = [];
  adattarolo6: any[] = [];
  adattarolo7: any[] = [];
  adattarolo8: any[] = [];
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
novenyadat(): void {
  this.serv.getnovenyadat().subscribe(data => {
    this.adattarolo3 = data;
  })
}
elozoev(): void {
  this.serv.getelozoev().subscribe(data => {
    this.adattarolo4 = data;
  })
}
gazdanev(): void {
  this.serv.getgazdanev().subscribe(data => {
    this.adattarolo5 = data;
  })
}
veti(): void {
 this.serv.getveti().subscribe(data => {
   this.adattarolo6 = data;
 })
}
datumbuza(): void {
 this.serv.getdatumbuza().subscribe(data => {
   this.adattarolo7 = data;
 })
}
termikili(): void {
 this.serv.gettermikili().subscribe(data => {
   this.adattarolo8 = data;
 })
}

}