import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Korisnik } from './model/Korisnik';
import { PrijavljenKorisnik } from './model/PrijavljenKorisnik';

@Injectable({
    providedIn: 'root'
})
export class IzmenaLozinkeService {


    constructor(private httpClient: HttpClient, private router: Router) { }

    izmenaLozinke(korisnikDTO: Korisnik): any {
        this.httpClient.post("http://localhost:8080/osoba/izmenaLozinke", korisnikDTO, { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } })
            .subscribe(
                data => {
                    alert("Uspesno ste promenili lozinku.");
                    if (this.user.uloga === "KORISNIK") {
                        this.router.navigate(['/profilKorisnik']);
                    } else if (this.user.uloga === "ADMINISTRATOR") {                    
                        this.router.navigate(['/profilAdmin']);
                    } else if (this.user.uloga === "VERIFIKATOR") {
                        this.router.navigate(['/profilVerifikator']);
                    } else {
                        this.router.navigate(['/profilKondukter']);
                    }
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
    get user(): any {
        return JSON.parse(localStorage.getItem('ulogovan')) as PrijavljenKorisnik;
    }
}