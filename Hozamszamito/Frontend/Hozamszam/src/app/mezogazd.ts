import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Mezogazd {
  private api = 'http://localhost:3000/api/gazda';
  constructor(private http: HttpClient) { }
  getGazda(): Observable<any> {
    return this.http.get<any>(this.api);
  }
  //eddig jutottam így gyorsan, ha le akarod tesztelni akkor legyen elindítva az Xampp, indítsd el terminálból az index.js-t 
  //a backendbe meg ng serve-eld le az angulart 
  //holnap vagy ma este írjál vagy 5 lekérdezést meg én is írok 5-öt holnap szerintem, tiéd a szűréses enyém meg a joinolásos ha úgy jó neked
}
