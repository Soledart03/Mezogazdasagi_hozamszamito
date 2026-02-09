import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Kiadasservice {
  private readonly kiadas_key = 'kiadaslista';
  constructor(private http:HttpClient){}
  private kiadasSubject = new BehaviorSubject<any[]>(this.loadFromStorage());
  kiadas$ = this.kiadasSubject.asObservable();
  loadKiadasByFold() {
    this.http
      .get<any[]>(`http://localhost:3000/api/kiad`)
      .subscribe(kiadass => {
        this.kiadasSubject.next(kiadass);
        localStorage.setItem(this.kiadas_key, JSON.stringify(kiadass));
        console.log('kiadás (GET):', kiadass);
      });
  }
  
  loadKiadasByFoldIds(foldIds: number[]) {
    if (!foldIds.length) return;

  // Betöltjük az összes kiadást
  this.http.get<any[]>('http://localhost:3000/api/kiad').subscribe({
    next: (data) => {
      // Frontenden szűrjük csak a kívánt fold_id-ket
      const szurt = data.filter(k => foldIds.includes(Number(k.fold_id)));
      console.log('szűrt123 kiadások:', szurt);
      this.kiadasSubject.next(szurt ?? []);
    },
    error: (err) => {
      console.error('Kiadások betöltése hiba:', err);
      this.kiadasSubject.next([]);
    }
  });
  }

    deleteKiadas(id: number) {  
      this.http.delete(`http://localhost:3000/api/kiad/${id}`)
        .subscribe({
          next: () => {
            const updated = this.kiadasSubject.value.filter(f => f.id !== id);
            this.kiadasSubject.next(updated);
          },
          error: err => console.error(err)
        });
    }



      private loadFromStorage(): any[] {
        const data = localStorage.getItem(this.kiadas_key);
        return data ? JSON.parse(data) : [];
      }
      

  setKiadások(list: any[]) {
    this.kiadasSubject.next(list);
  }
  /*
  
  addKiad(kiad: any) {
    this.http.post<any>('http://localhost:3000/api/kiad', kiad)
      .subscribe({
        next: newKiadas => {
          const current = this.kiadasSubject.value;
          this.kiadasSubject.next([...current, newKiadas]);
        },
        error: err => console.error(err)
      });
  }
*/
addKiadas(kiadas: any) {
  return this.http.post('http://localhost:3000/api/kiad', kiadas);
}
 


  
}
