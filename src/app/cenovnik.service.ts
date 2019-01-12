import { Injectable } from '@angular/core';
import {Cenovnik} from './model/Cenovnik';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CenovnikService {
     private cenovnikUrl = 'http://localhost:8080/cenovnici';  // URL to web api

  getCenovnik() {  
     return this.http.get<Cenovnik>(this.cenovnikUrl+"/trenutni").toPromise();
     
  }
  constructor(private http: HttpClient ) { }
}
