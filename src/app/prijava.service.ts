import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Login } from './model/Login';
import { Token } from './model/Token';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PrijavaService {

    token: Token;

  constructor(private httpClient: HttpClient, private router: Router) { }

  post(korisnik: Login) {
      this.httpClient.post("http://localhost:8080/osoba/login", korisnik)
          .subscribe(
              data => {
                  this.token = data as Token;
                  localStorage.setItem('X-Auth-Token', this.token.token);
                
              },
              headers => {
                  if (headers.status == 400) {
                      alert("Uneli ste neispravne kredencijale.")
                  } 
              }
          );
            }
}
