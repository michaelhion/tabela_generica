import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detalhe, Tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url: string ="http://localhost:3000/registros";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tipo[]> {
      return this.http.get<Tipo[]>(this.url);
  }
  getTwoRev(oldRev:string,newRev:string): Observable<Detalhe> {
      let detalheUrl = `${this.url}/comparar?oldRev=${oldRev}&newRev=${newRev}`
      return this.http.get<Detalhe>(detalheUrl);
  }
}
