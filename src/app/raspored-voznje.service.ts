import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RasporedVoznje } from './model/RasporedVoznje';
import { RedVoznje } from './model/RedVoznje';

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

  dobaviBuduciRedVoznje():any {
    var token=localStorage.getItem('X-Auth-Token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({'X-Auth-Token':token})
    };
    return this.httpClient.get<RedVoznje>("http://localhost:8080/redVoznje/buduci",httpOptions).toPromise();
  }


  dobaviBuduceRasporede():any {
    var token=localStorage.getItem('X-Auth-Token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({'X-Auth-Token':token})
    };
    return this.httpClient.get<RasporedVoznje[]>("http://localhost:8080/redVoznje/dobaviBuduceRasporede", httpOptions).toPromise();
  }

  kreirajRedVoznje(red:RedVoznje):any {
    var token=localStorage.getItem('X-Auth-Token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({'X-Auth-Token':token})
    };
    return this.httpClient.post<RedVoznje>("http://localhost:8080/redVoznje/kreirajNovi", red, httpOptions).toPromise();
  }


  obrisiBuduciRedVoznje():any {
    var token=localStorage.getItem('X-Auth-Token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({'X-Auth-Token':token})
    };
    return this.httpClient.delete<string>("http://localhost:8080/redVoznje/obrisiBuduci", {...httpOptions, responseType:'text' as 'json'}).toPromise();
  }


  izmeniBuduciRedVoznje(podaci:RedVoznje):any {
    var token=localStorage.getItem('X-Auth-Token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({'X-Auth-Token':token})
    };
    return this.httpClient.post<string>("http://localhost:8080/redVoznje/izmeniBuduci", podaci, {...httpOptions, responseType:'text' as 'json'}).toPromise();
  }


  kreirajRaspored(podaci:RasporedVoznje):any {
    var token=localStorage.getItem('X-Auth-Token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({'X-Auth-Token':token})
    };
    return this.httpClient.post<string>("http://localhost:8080/redVoznje/kreirajRaspored", podaci, {...httpOptions, responseType:'text' as 'json'}).toPromise();
  }


  obrisiRaspored(idRasporeda:number):any {
    var token=localStorage.getItem('X-Auth-Token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({'X-Auth-Token':token})
    };
    return this.httpClient.delete<string>("http://localhost:8080/redVoznje/obrisiRaspored/"+idRasporeda, {...httpOptions, responseType:'text' as 'json'}).toPromise();
  }


  





}
