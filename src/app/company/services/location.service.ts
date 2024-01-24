import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  constructor(private http: HttpClient) {}

  obterDadosCep(cep: string): Observable<any> {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(apiUrl);
  }
}