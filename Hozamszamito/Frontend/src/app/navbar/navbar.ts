import { Component} from '@angular/core';
import { App } from '../app';
import { Gazdaservice } from '../gazdaservice';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
constructor(private app:App,private gazdser:Gazdaservice){}
loginsucces:boolean = false;
  openMenu(type: any){
    this.app.openMenu(type);
  }
  gazdaadat: any[]=[];
  gazdabetolt(){
    this.gazdaadat = this.gazdser.getGazdaData();
    this.loginsucces;
    console.log(this.loginsucces);
    console.log(this.gazdaadat);
  }
}
