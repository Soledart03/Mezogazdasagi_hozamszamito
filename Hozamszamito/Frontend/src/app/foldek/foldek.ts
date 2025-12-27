import { Component } from '@angular/core';
import { App } from '../app';
@Component({
  selector: 'app-foldek',
  standalone: false,
  templateUrl: './foldek.html',
  styleUrl: './foldek.css',
})
export class Foldek {
constructor(private app:App){}
openMenu(type: any){
    this.app.openMenu(type);
  }
  
}
