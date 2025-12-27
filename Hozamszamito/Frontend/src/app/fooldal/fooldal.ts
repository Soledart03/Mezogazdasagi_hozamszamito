import { Component, OnInit } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
@Component({
  selector: 'app-fooldal',
  standalone: false,
  templateUrl: './fooldal.html',
  styleUrl: './fooldal.css',
})
export class Fooldal implements OnInit{

  constructor(private gazdservice:Gazdaservice){}

  public szamolo: any[] = [];

  ngOnInit():void{
    this.loadFold();
  }

  loadFold(){
    this.gazdservice.getoszfold().subscribe(data => this.szamolo = data);
  }
  
} 

