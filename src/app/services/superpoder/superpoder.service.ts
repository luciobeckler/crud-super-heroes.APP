import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuperPoderes } from 'src/app/interfaces/SuperPoderes';

@Injectable({
  providedIn: 'root',
})
export class SuperpoderService {
  private baseUrl = 'https://localhost:7027/api/superpoderes';

  constructor(private http: HttpClient) {}

  listarSuperpoderes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getSuperPoderesHeroi(id: number): Observable<SuperPoderes[]> {
    return this.http.get<SuperPoderes[]>(`${this.baseUrl}/${id}`);
  }
}
