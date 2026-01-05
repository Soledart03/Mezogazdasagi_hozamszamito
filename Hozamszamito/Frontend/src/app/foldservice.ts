import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
const fold_key = 'foldlista';
@Injectable({
  providedIn: 'root',
})
export class Foldservice {
  constructor(private http:HttpClient){}
  getFoldida(id:number):Observable<any>{
    return this.http.get('http://localhost:3000/api/gfold'+'/'+id);
  }

  addFold(fold:{'terulet','muvelesi_ag','helyrajzi_szam','elozo_evi_hasznositas','gazda_id'}){
      return this.http.post('http://localhost:3000/api/pfold',fold);
    }
  private foldSubject = new BehaviorSubject<any>(this.loadFromStorage());
  fold$ = this.foldSubject.asObservable();

  
  setFold(fold: any) {
    this.foldSubject.next(fold);
    localStorage.setItem(fold_key, JSON.stringify(fold));
  }
  
  clearFold() {
    this.foldSubject.next(null);
    localStorage.removeItem(fold_key);
  }
  getFold() {
    return this.foldSubject.value;
  }

  private loadFromStorage() {
    const data = localStorage.getItem(fold_key);
    return data ? JSON.parse(data) : null;
  }
}
