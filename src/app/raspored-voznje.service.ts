import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RasporedVoznje } from './model/RasporedVoznje';

@Injectable({
  providedIn: 'root'
})
export class RasporedVoznjeService {

  constructor(private httpClient:HttpClient) { }


  dobaviTrenutneRasporede():any {
    return this.httpClient.get<RasporedVoznje[]>("http://localhost:8080/redVoznje/dobaviTrenutneRasporede").toPromise();
  }


  dobaviJedanTrenutniRaspred(raspored:RasporedVoznje):any {
    return this.httpClient.post<RasporedVoznje>("http://localhost:8080/redVoznje/raspored", raspored).toPromise();
  }
}
