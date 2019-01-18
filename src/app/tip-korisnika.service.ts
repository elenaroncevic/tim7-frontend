import { Injectable } from '@angular/core';
import { TipKorisnika } from './model/TipKorisnika';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class TipKorisnikaService {
    tipKorisnika: TipKorisnika;

    constructor(private httpClient: HttpClient, private router: Router) { }

    getTipKorisnika() {
        this.httpClient.get("http://localhost:8080/osoba/tipKorisnika",{headers:{'X-Auth-Token': localStorage.getItem('X-Auth-Token')}}).subscribe(
                data => {
                    this.tipKorisnika = data as TipKorisnika;

                    if (this.tipKorisnika.uloga === "KORISNIK") {
                        this.router.navigate(['/profilKorisnik']);

                    } else if (this.tipKorisnika.uloga === "ADMINISTRATOR") {
                        this.router.navigate(['/profilAdmin']);


                    } else if (this.tipKorisnika.uloga === "VERIFIKATOR") {
                        this.router.navigate(['/profilVerifikator']);

                    } else {
                        this.router.navigate(['/profilKondukter']);
                    }

                },
                headers => {
                    if (headers.status == 400) {
                        alert("Uneli ste neispravne kredencijale.")
                    }
                }
            );
    }
}
