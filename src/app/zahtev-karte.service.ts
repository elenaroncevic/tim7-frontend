import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OdobrenjeKarte } from './model/OdobrenjeKarte';
import { Odgovor } from './model/Odgovor';

@Injectable({
  providedIn: 'root'
})
export class ZahtevKarteService {

  constructor(private httpClient:HttpClient) { }

  dobaviNeodobrene():any {
    var token=localStorage.getItem('X-Auth-Token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({'X-Auth-Token':token})
    };
    return this.httpClient.get<OdobrenjeKarte>("http://localhost:8080/karte/dobaviNeodobreneKarte", httpOptions).toPromise();
  }

  odobriKartu(idKarte:number, status:string):any {
    var token=localStorage.getItem('X-Auth-Token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({'X-Auth-Token':token})
    };
    return this.httpClient.post<Odgovor>("http://localhost:8080/karte/odobriKartu/"+idKarte+'/'+status+'/', null, httpOptions).toPromise();
  }

}
