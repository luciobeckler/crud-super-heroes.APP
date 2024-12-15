import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroiService {
  private baseUrl = 'https://localhost:7027/api/Herois';

  constructor(private http: HttpClient) {}

  listarHerois(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  obterHeroiPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  criarHeroi(heroi: any): Observable<any> {
    return this.http.post(this.baseUrl, heroi);
  }

  atualizarHeroi(id: number, heroi: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, heroi);
  }

  excluirHeroi(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
