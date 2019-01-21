import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IzlistavanjeKarataService {

  

  constructor(private httpClient: HttpClient) { }

  getKarteUlogovanog(): any {
    return this.httpClient.get("http://localhost:8080/karte/izlistajKarte", { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } });
  }
}
