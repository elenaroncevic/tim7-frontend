import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetZoneService {


  constructor(private httpClient: HttpClient) { }

  getZone(): any {
    return this.httpClient.get("http://localhost:8080/zone/izlistajZone", { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } });
  }
}
