import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Mezogazd {
  private api = 'http://localhost:3000/api/gazda';
  private api2 = 'http://localhost:3000/api/gazdkiad';
  private api3 = 'http://localhost:3000/api/novenyadat';
  private api4 = 'http://localhost:3000/api/elozoev';
  private api5 = 'http://localhost:3000/api/gazdanev';
  private api6 = 'http://localhost:3000/api/veti';
  private api7 = 'http://localhost:3000/api/datumbuza';
  private api8 = 'http://localhost:3000/api/termikili';
  constructor(private http: HttpClient) { }
  getGazda(): Observable<any> {
    return this.http.get<any>(this.api);
  }
  getgazdKiad(): Observable<any> {
    return this.http.get<any>(this.api2);
  }
  getnovenyadat(): Observable<any> {
    return this.http.get<any>(this.api3);
  }
  getelozoev(): Observable<any> {
    return this.http.get<any>(this.api4);
  }
  getgazdanev(): Observable<any> {
    return this.http.get<any>(this.api5);
  }
  getveti(): Observable<any> {
    return this.http.get<any>(this.api6);
  }
  getdatumbuza(): Observable<any> {
    return this.http.get<any>(this.api7);
  }
  gettermikili(): Observable<any> {
    return this.http.get<any>(this.api8);
  }
  Reg(gazda: any): Observable<any> {
    return this.http.post<any>(this.api, gazda);
    }
}
