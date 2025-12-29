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
   ngOnInit() {
    this.gazdser.gazda$.subscribe(data => {
      this.gazdaadat = data;
      this.loginsucces = !!data;

      console.log('NAVBAR FRISSÜLT:', data);
    });
    
}
logout() {
    this.gazdser.clearGazda();
    window.alert('Sikeresen kijelentkeztél!')
  }
}
  
