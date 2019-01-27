import { Injectable } from '@angular/core';
import {Cenovnik} from './model/Cenovnik';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Linija, Zona, SveZaStavku} from './model/Linija'

@Injectable({
  providedIn: 'root'
})
export class CenovnikService {
     private cenovnikUrl = 'http://localhost:8080/cenovnici';  // URL to web api
     private linijaUrl = 'http://localhost:8080/linije';

  getCenovnik() {  
     return this.http.get<Cenovnik>(this.cenovnikUrl+"/trenutni").toPromise();     
  }

  getSveZaStavku(){
    var token = localStorage.getItem('X-Auth-Token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    httpOptions.headers = httpOptions.headers.append( 'X-Auth-Token' , token);
    return this.http.get<SveZaStavku>(this.cenovnikUrl+"/zaCenovnik", httpOptions).toPromise();
  }

  addCenovnik(cenovnik : Cenovnik){
    var token = localStorage.getItem('X-Auth-Token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    httpOptions.headers = httpOptions.headers.append( 'X-Auth-Token' , token);

    console.log(httpOptions);
    return this.http.post<string>(this.cenovnikUrl, cenovnik, {...httpOptions, responseType: 'text' as 'json'} ).toPromise();
  }

  constructor(private http: HttpClient, protected localStorage: LocalStorage ) { }
}
