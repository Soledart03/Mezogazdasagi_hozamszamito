  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { BehaviorSubject } from 'rxjs';
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
        });
    }
        
    getTerv() {
      return this.tervSubject.value;
    }
    loadNoveny(){
      return this.http.get<any[]>(`http://localhost:3000/api/noveny`);
    }
    private loadFromStorage() {
      const data = localStorage.getItem(terv);
      return data ? JSON.parse(data) : null;
    }
  }
