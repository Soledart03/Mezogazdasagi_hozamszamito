import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Gazdaservice {
  private api = 'http://localhost:3000/api/gazda';
  private apilogin = 'http://localhost:3000/api/log';
  constructor(private http:HttpClient){}
  addGazda(gazda:{'nev','email','jelszo'}):Observable<any>{
    return this.http.post(this.api,gazda);
  }
  addFold(fold:{'terulet','muvelesi_ag','helyrajzi_szam','elozo_evi_hasznositas','gazda_id'}){
    return this.http.post('http://localhost:3000/api/pfold',fold);
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
  getFoldida(id:number):Observable<any>{
    return this.http.get('http://localhost:3000/api/gfold'+'/'+id);
  }

}
