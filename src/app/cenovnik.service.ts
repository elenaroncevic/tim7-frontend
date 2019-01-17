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

  addCenovnik(){
    //return this.http.post(this.cenovnikUrl+"/")
  }

  editCenovnik(cenovnik : Cenovnik, token : string){
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    httpOptions.headers = httpOptions.headers.append( 'X-Auth-Token' , 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhIiwiY3JlYXRlZCI6MTU0NzY4NjY5NDcyNCwiZXhwIjoxNTQ3NzA0Njk0fQ.4-YCcYZD81cK4ArrSXxcIkYJdabAPN2Rfu8mjGLLu9S5qaTKdWzNo_En_6ZCLW5Ra4pg8jvfHu6d7oyaTpsm_A');
    console.log(httpOptions);
    return this.http.put<Cenovnik>(this.cenovnikUrl + "/" + cenovnik.id, cenovnik, httpOptions ).toPromise();
  }

  constructor(private http: HttpClient, protected localStorage: LocalStorage ) { }
}
