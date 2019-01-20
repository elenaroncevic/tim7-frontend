import { Injectable } from '@angular/core';
import { PrijavljenKorisnik } from './model/PrijavljenKorisnik';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class TipKorisnikaService {
    tipKorisnika: PrijavljenKorisnik;

    constructor(private httpClient: HttpClient, private router: Router) { }

    getUlogovanKorisnika() {
        this.httpClient.get("http://localhost:8080/osoba/prijavljenKorisnik",{headers:{'X-Auth-Token': localStorage.getItem('X-Auth-Token')}}).subscribe(
                data => {
                    this.tipKorisnika = data as PrijavljenKorisnik;

                    if (this.tipKorisnika.uloga === "KORISNIK") {
                        
                        localStorage.setItem("ulogovan", JSON.stringify(this.tipKorisnika));
                        this.router.navigate(['/profilKorisnik']);

                    } else if (this.tipKorisnika.uloga === "ADMINISTRATOR") {
                        localStorage.setItem("ulogovan", JSON.stringify(this.tipKorisnika));
                        this.router.navigate(['/profilAdmin']);


                    } else if (this.tipKorisnika.uloga === "VERIFIKATOR") {
                        localStorage.setItem("ulogovan", JSON.stringify(this.tipKorisnika));
                        this.router.navigate(['/profilVerifikator']);

                    } else {
                        localStorage.setItem("ulogovan", JSON.stringify(this.tipKorisnika));
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
