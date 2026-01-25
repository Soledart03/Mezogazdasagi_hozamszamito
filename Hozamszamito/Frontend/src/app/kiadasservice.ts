import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
const kiadas_key = 'kiadaslista';

@Injectable({
  providedIn: 'root',
})
export class Kiadasservice {

  constructor(private http:HttpClient){}
  private kiadasSubject = new BehaviorSubject<any[]>(this.loadFromStorage());
  kiadas$ = this.kiadasSubject.asObservable();
  loadKiadasByFold(foldID: number) {
      this.http.get<any[]>(`http://localhost:3000/api/kiad/${foldID}`).subscribe(kiadass => {
          this.kiadasSubject.next(kiadass); 
          console.log('kiadás:',kiadass);
        });
      }



  private loadFromStorage() {
    const data = localStorage.getItem(kiadas_key);
    return data ? JSON.parse(data) : null;
  }


  
}
