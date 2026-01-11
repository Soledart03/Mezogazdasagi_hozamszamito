import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ChatResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root'
})
export class PolliService {

  // Backend endpoint
  private apiUrl = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) {}

   generateText(message: string): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(this.apiUrl, { message });
  }
}
