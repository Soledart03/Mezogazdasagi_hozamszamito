import { Component } from '@angular/core';
import { App } from '../app';
import { Loginform } from '../loginform/loginform';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
constructor(private app:App, log:Loginform){}
  openMenu(type: any){
    this.app.openMenu(type);
  }
  
}
