import { Component,OnInit } from '@angular/core';
import { Mezogazd } from '../mezogazd';
@Component({
  selector: 'app-mezogazd-comp',
  standalone: false,
  templateUrl: './mezogazd-comp.html',
  styleUrl: './mezogazd-comp.css',
})
export class MezogazdComp implements OnInit {
  adattarolo: any[] = [];
  constructor(private serv: Mezogazd){}
  ngOnInit(): void {
    this.gazdatolt();
  }
 gazdatolt(): void {
  this.serv.getGazda().subscribe(data => {
    this.adattarolo = data;
  })
  //eddig jutottam így gyorsan, holnap vagy ma este írjál vagy 5 lekérdezést meg én is írok 5-öt holnap szerintem, 
  //tiéd a szűréses enyém meg a joinolásos ha úgy jó neked
}
}
