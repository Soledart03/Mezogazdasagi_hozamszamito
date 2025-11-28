import { Component } from '@angular/core';
import { App } from '../app';
@Component({
  selector: 'app-fooldal',
  standalone: false,
  templateUrl: './fooldal.html',
  styleUrl: './fooldal.css',
})
export class Fooldal {
  constructor(private app:App){}
  openMenu(type: any){
    this.app.openMenu(type);
  }
} 

