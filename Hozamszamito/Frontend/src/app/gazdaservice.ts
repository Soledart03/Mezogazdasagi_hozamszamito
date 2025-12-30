import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
const Gazda_key = 'bejelentkezettGazda';

@Injectable({
  providedIn: 'root',
})
export class Gazdaservice {
  private api = 'http://localhost:3000/api/gazda';
  private apilogin = 'http://localhost:3000/api/log';
  private loggedIn = false;
  private gazdaSubject = new BehaviorSubject<any>(this.loadFromStorage());
  gazda$ = this.gazdaSubject.asObservable();

  setGazdaData(data: any) {
    this.gazdaSubject.next(data);
    localStorage.setItem(Gazda_key, JSON.stringify(data));
  }
  clearGazda() {
    this.gazdaSubject.next(null);
    localStorage.removeItem(Gazda_key);
  }
  private loadFromStorage() {
    const data = localStorage.getItem(Gazda_key);
    return data ? JSON.parse(data) : null;
  }
  
  getGazdaData(gazda:any) {
    this.gazdaSubject.next(gazda);
    localStorage.setItem('bejelentkezettGazda', JSON.stringify(gazda));
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  constructor(private http:HttpClient){}
  addGazda(gazda:{'nev','email','jelszo'}):Observable<any>{
    return this.http.post(this.api,gazda);
  }
  
  logc(gazda:{'nev','email','jelszo'}):Observable<any>{
    return this.http.post(this.apilogin,gazda);
  }
  getGazda(id:number):Observable<any>{
    return this.http.get(this.api+'/'+id);
  }
  getOszFold():Observable<any>{
    return this.http.get('http://localhost:3000/api/foldszam');
  }
  

}
