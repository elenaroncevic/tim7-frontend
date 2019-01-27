import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetLinijeZoneService {


  constructor(private httpClient: HttpClient) { }

  getZone(): any {
    return this.httpClient.get("http://localhost:8080/cenovnici/trenutni", { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } });
  }
}
