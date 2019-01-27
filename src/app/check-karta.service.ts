import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Odgovor } from './model/Odgovor';

@Injectable({
  providedIn: 'root'
})
export class CheckKartaService {

  constructor(private httpClient:HttpClient) { }

  proveriKartu(tipVozila:string, nazivLinije:string, kod:string):any {
      var token=localStorage.getItem('X-Auth-Token');
      console.log(token);
      const httpOptions = {
        headers: new HttpHeaders({'X-Auth-Token':token})
      };
      return this.httpClient.post<Odgovor>("http://localhost:8080/karte/proveriKartu/"+tipVozila+'/'+nazivLinije+'/'+kod, null, httpOptions).toPromise();
  

  }

}




