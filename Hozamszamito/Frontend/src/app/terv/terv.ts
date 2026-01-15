import { Component,OnInit } from '@angular/core';
import { App } from '../app';
import { Gazdaservice } from '../gazdaservice';
import { Tervservice } from '../tervservice';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-terv',
  standalone: false,
  templateUrl: './terv.html',
  styleUrl: './terv.css',
})
export class Terv {
constructor(private app:App,private gazdaser:Gazdaservice,private tervser:Tervservice){}
gazdaId: number = 0;
}
