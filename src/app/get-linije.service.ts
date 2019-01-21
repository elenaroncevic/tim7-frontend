import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetLinijeService {


  constructor(private httpClient: HttpClient) { }

  getLinije(): any {
    return this.httpClient.get("http://localhost:8080/linije/izlistajLinije", { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } })
  }
}
