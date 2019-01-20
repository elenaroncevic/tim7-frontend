import { Injectable } from '@angular/core';
import {Cenovnik} from './model/Cenovnik';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class CenovnikService {
     private cenovnikUrl = 'http://localhost:8080/cenovnici';  // URL to web api

  getCenovnik() {  
     return this.http.get<Cenovnik>(this.cenovnikUrl+"/trenutni").toPromise();
     
  }

  addCenovnik(cenovnik : Cenovnik){
    var token = localStorage.getItem('X-Auth-Token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    httpOptions.headers = httpOptions.headers.append( 'X-Auth-Token' , token);
    console.log(httpOptions);
    return this.http.post<Cenovnik>(this.cenovnikUrl, cenovnik, httpOptions ).toPromise();
  }

  constructor(private http: HttpClient, protected localStorage: LocalStorage ) { }
}
