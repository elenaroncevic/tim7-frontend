import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Korisnik } from './model/Korisnik';
@Injectable({
  providedIn: 'root'
})
export class IzmenaLicnihPodatakaService {

  
  constructor(private httpClient: HttpClient, private router: Router) { }

  izmenaLicnihPodataka(korisnikDTO: Korisnik): any {
      this.httpClient.post("http://localhost:8080/osoba/izmenaPodataka", korisnikDTO, { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } })
          .subscribe(
              data => {
                    var kor= JSON.parse(localStorage.getItem('ulogovan')) as Korisnik;
                    kor.ime= korisnikDTO.ime;
                    kor.prezime= korisnikDTO.prezime;
                    kor.email= korisnikDTO.email;

                    localStorage.setItem("ulogovan", JSON.stringify(kor));

                  this.router.navigate(['/profilKorisnik']);
              },
              headers => {
                  console.error("Greska na serveru.");

              }
          );

  }
}
