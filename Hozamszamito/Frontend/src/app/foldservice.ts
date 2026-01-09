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
  private foldSubject = new BehaviorSubject<any[]>(this.loadFromStorage());
  fold$ = this.foldSubject.asObservable();Í
  
  loadFoldsByGazdaId(gazdaId: number) {
    this.http.get<any[]>(`http://localhost:3000/api/gfold/${gazdaId}`).subscribe(folds => {
        console.log('BACKEND FÖLDEK:', folds);
        this.foldSubject.next(folds); 
      
      });
  }
  /*
  addFold(fold:{'terulet','muvelesi_ag','helyrajzi_szam','elozo_evi_hasznositas','gazda_id'}){
      return this.http.post('http://localhost:3000/api/pfold',fold);
    }
getFoldida(id:number):Observable<any>{
    return this.http.get('http://localhost:3000/api/gfold'+'/'+id);
  }
  */

  
  addFold(fold: any) {
    this.http.post<any>('/api/fold', fold)
      .subscribe({
        next: newFold => {
          const current = this.foldSubject.value;
          this.foldSubject.next([...current, newFold]);
          window.alert("Föld hozzáadva!")
        },
        error: err => console.error(err)
      });
  }
updateFold(fold: any) {
  
  this.http.put<any>(`http://localhost:3000/api/ufold/${fold.id}`, fold)
    .subscribe({
      next: updatedFold => {
        console.log('1');
        const list = this.foldSubject.value.map(f =>
          
          f.id === updatedFold.id ? updatedFold : f
          
        );
        console.log('2');
        this.foldSubject.next(list);
        console.log('3');
      },
      error: err => console.error(err)
    });
}

  deleteFold(id: number) {  
    this.http.delete(`/api/fold/${id}`)
      .subscribe({
        next: () => {
          const updated = this.foldSubject.value.filter(f => f.id !== id);
          this.foldSubject.next(updated);
        },
        error: err => console.error(err)
      });
  }

  getFold() {
    return this.foldSubject.value;
  }

  private loadFromStorage() {
    const data = localStorage.getItem(fold_key);
    return data ? JSON.parse(data) : null;
  }
}
