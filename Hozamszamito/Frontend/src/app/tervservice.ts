  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { BehaviorSubject, Observable } from 'rxjs';
  const terv = 'foldlista';
  @Injectable({
    providedIn: 'root',
  })
  export class Tervservice {
    constructor(private http:HttpClient){}
    private tervSubject = new BehaviorSubject<any[]>(this.loadFromStorage());
    terv$ = this.tervSubject.asObservable();
    
    loadTervByFold(foldID: number) {
      this.http.get<any[]>(`http://localhost:3000/api/terv/${foldID}`).subscribe(tervs => {
          this.tervSubject.next(tervs); 
          console.log('terv:',tervs);
        });
    }
        
    getTerv() {
      return this.tervSubject.value;
    }
    loadConnNovinp(){
      return this.http.get<any[]>(`http://localhost:3000/api/novinp`);
    }
    //!!!
    loadKiadCount(foldID: number):Observable<any> {
      return this.http.get<any[]>(`http://localhost:3000/api/kiadasok_szam/${foldID}`);
    }
    loadKiadSum(foldID: number):Observable<any> {
      return this.http.get<any[]>(`http://localhost:3000/api/kiadasok_osszege/${foldID}`);
    }
    loadNoveny(){
      return this.http.get<any[]>(`http://localhost:3000/api/noveny`);
    }
    loadnovinp(){
      return this.http.get<any[]>(`http://localhost:3000/api/novinp`);
    }
    loadVetomag(){
      return this.http.get<any[]>(`http://localhost:3000/api/inp_v`);
    }
    loadMutragya(){
      return this.http.get<any[]>(`http://localhost:3000/api/inp_m`);
    }
    addTerv(terv: any) {
    this.http.post<any>('http://localhost:3000/api/terv', terv)
      .subscribe({
        next: ujterv => {
          const current = this.tervSubject.value;
          this.tervSubject.next([...current, ujterv]);
          window.alert("Terv hozzáadva!")
        },
        error: err => console.error(err)
      });
  }
    private loadFromStorage() {
      const data = localStorage.getItem(terv);
      return data ? JSON.parse(data) : null;
    }
  }
