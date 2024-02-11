import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  constructor(private http: HttpClient) { }

  getCompany(id:string) {
    return this.http.get<Company>(`https://api/company/${id}`).pipe(map(data => {
      // return {
      //   name: data.companyName
      // }
    }))
  }
}
