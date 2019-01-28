import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Karta } from './model/Karta';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KartaService {


  constructor(private httpClient: HttpClient, private router: Router) { }

  kupiKartu(kartaDto: Karta): any {
    this.httpClient.post("http://localhost:8080/karte/kupovinaKarte", kartaDto, { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } })
      .subscribe(
        data => {
          alert("Uspesno ste izvrsili kupovinu karte.");
          this.router.navigate(['/profilKorisnik']);
        },
        headers => {

          if (headers.status == 304) {
            alert("Karta koju ste odabrali je vec kupljena.");

          } else {
            console.error("Greska na serveru.");
          }
        }
      );
  }

  getKarteUlogovanog(): any {
    return this.httpClient.get("http://localhost:8080/karte/izlistajKarte", { headers: { 'X-Auth-Token': localStorage.getItem('X-Auth-Token') } });
  }
}

