import { Component } from '@angular/core';
import { App } from '../app';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
constructor(private app:App){}
  openMenu(type: any){
    this.app.openMenu(type);
  }
  
}
