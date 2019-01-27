import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Login } from './model/Login';
import { Token } from './model/Token';
import { Korisnik } from './model/Korisnik';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrijavljenKorisnik } from './model/PrijavljenKorisnik';

@Injectable({
    providedIn: 'root'
})
export class KorisnikService {

    token: Token;

    constructor(private httpClient: HttpClient, private router: Router) { }


    prijava(korisnik: Login) {
        this.httpClient.post("http://localhost:8080/osoba/login", korisnik)
            .subscribe(
                data => {
                    this.token = data as Token;
                    localStorage.setItem('X-Auth-Token', this.token.token);
                    this.getUlogovanKorisnik();
                },
                headers => {
                    if (headers.status == 400) {
                        alert("Uneli ste neispravne kredencijale.")
                    }
                }
            );
    }

    registracija(korisnik: Korisnik) {
        this.httpClient.post("http://localhost:8080/osoba/registracija", korisnik)
            .subscribe(
                data => {
                    alert("Uspesno ste izvrsili registraciju.")
                    this.router.navigate(['/'])
                },
                headers => {
                    if (headers.status == 302) {
                        alert("Korisnik sa unetim korisnickim imenom vec postoji.")
                    } else if (headers.status == 304) {
                        alert("Niste ispravno potvrdili lozinku.")
                    } else {
                        alert("Nepoznata greska.")
                    }
                }
            );
    }

    izmenaLozinke(korisnikDTO: Korisnik): any {
        this.httpClient.post("http://localhost:8080/osoba/izmenaLozinke", korisnikDTO, { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } })
            .subscribe(
                data => {
                    var user = JSON.parse(localStorage.getItem('ulogovan')) as PrijavljenKorisnik;
                    alert("Uspesno ste promenili lozinku.");
                    this.redirectProfil()
                },
                headers => {
                    if (headers.status == 304) {
                        alert("Niste uneli ispravno trenutnu lozinku.")
                    } else if (headers.status == 400) {
                        alert("Niste ispravno potvrdili novu lozinku.")
                    } else {
                        alert("Nepoznata greska.")
                    }

                }
            );
    }

    izmenaLicnihPodataka(korisnikDTO: Korisnik): any {
        this.httpClient.post("http://localhost:8080/osoba/izmenaPodataka", korisnikDTO, { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } })
            .subscribe(
                data => {
                    var kor = JSON.parse(localStorage.getItem('ulogovan')) as Korisnik;
                    kor.ime = korisnikDTO.ime;
                    kor.prezime = korisnikDTO.prezime;
                    kor.email = korisnikDTO.email;

                    localStorage.setItem("ulogovan", JSON.stringify(kor));

                    this.router.navigate(['/profilKorisnik']);
                },
                headers => {
                    console.error("Greska na serveru.");

                }
            );

    }

    getUlogovanKorisnik() {
        this.httpClient.get("http://localhost:8080/osoba/prijavljenKorisnik", { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } }).subscribe(
            data => {
                var tipKorisnika = data as PrijavljenKorisnik;
                localStorage.setItem("ulogovan", JSON.stringify(tipKorisnika));
                this.redirectProfil()
            },
            headers => {
                if (headers.status == 400) {
                    alert("Uneli ste neispravne kredencijale.")
                }
            }
        );
    }

    redirectProfil(){
        var tipKorisnika = JSON.parse(localStorage.getItem("ulogovan")) as PrijavljenKorisnik;
        if (tipKorisnika.uloga === "KORISNIK") {
            this.router.navigate(['/profilKorisnik']);

        } else if (tipKorisnika.uloga === "ADMINISTRATOR") {
            this.router.navigate(['/profilAdmin']);

        } else if (tipKorisnika.uloga === "VERIFIKATOR") {
            this.router.navigate(['/profilVerifikator']);
        } else {
            this.router.navigate(['/profilKondukter']);
        }
    }

}
