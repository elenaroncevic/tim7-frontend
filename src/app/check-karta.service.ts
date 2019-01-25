import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckKartaService {

  constructor(private httpClient:HttpClient) { }

  proveriKartu(tipVozila:string, nazivLinije:string, kod:string):any {
  this.httpClient.post("http://localhost:8080/karte/proveriKartu/"+tipVozila+'/'+nazivLinije+'/'+kod, { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } })
  .subscribe(
    data => {
        alert("Karta je vazeca.");
        console.log(data);
    },
    headers => {

        if (headers.status==400){
            alert("Karta nije vazeca.");

        }else{
        console.error("Greska na serveru.");
        }
    }
);
}

}




