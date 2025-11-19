import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Mezogazd {
  private api = 'http://localhost:3000/api/gazda';
  private api2 = 'http://localhost:3000/api/gazdkiad';
  constructor(private http: HttpClient) { }
  getGazda(): Observable<any> {
    return this.http.get<any>(this.api);
  }
  getgazdKiad(): Observable<any> {
    return this.http.get<any>(this.api2);
  }
  
}
