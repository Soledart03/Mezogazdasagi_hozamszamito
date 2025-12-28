import { Component, OnInit } from '@angular/core';
import { Gazdaservice } from '../gazdaservice';
import { Loginform } from '../loginform/loginform';
@Component({
  selector: 'app-fooldal',
  standalone: false,
  templateUrl: './fooldal.html',
  styleUrl: './fooldal.css',
})
export class Fooldal implements OnInit{

  constructor(private gazdservice:Gazdaservice, private loggazd:Loginform){}
  
  public szamolo: any[] = [];

  ngOnInit():void{
    this.loadFold();
  }

  loadFold(){
    this.gazdservice.getOszFold().subscribe(data => this.szamolo = data);
  }
  
} 

