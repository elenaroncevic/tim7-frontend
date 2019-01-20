import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Karta } from './model/Karta';
@Injectable({
    providedIn: 'root'
})
export class KupovinaKarteService {


    constructor(private httpClient: HttpClient, private router: Router) { }

    kupiKartu(kartaDto: Karta): any {
        this.httpClient.post("http://localhost:8080/karte/kupovinaKarte", kartaDto, { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } })
            .subscribe(
                data => {
                    alert("Uspesno ste izvrsili kupovinu karte.");
                    this.router.navigate(['/profilKorisnik']);
                },
                headers => {
                    console.error("Greska na serveru.");

                }
            );

    }
}
