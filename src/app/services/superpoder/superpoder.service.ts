import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperpoderService {
  private baseUrl = 'https://localhost:7027/api/superpoderes';

  constructor(private http: HttpClient) {}

  listarSuperpoderes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
