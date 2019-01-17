import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { Korisnik } from './model/Korisnik';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RegistracijaService {

    constructor(private httpClient: HttpClient, private router: Router) { }

    post(korisnik: Korisnik) {
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
}
