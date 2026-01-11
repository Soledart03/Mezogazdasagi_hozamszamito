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
  private apiUrl = '/api/chat';

  constructor(private http: HttpClient) {}

  generateText(prompt: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, {
      message: prompt
    });
  }
}
