import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { PrijavljenKorisnik } from '../model/PrijavljenKorisnik';

import { OnInit } from '@angular/core';
import { IzlistavanjeKarataService } from '../izlistavanje-karata.service';
import { Karta } from '../model/Karta';
@Component({
  selector: 'app-profil-korisnik',
  templateUrl: './profil-korisnik.component.html',
  styleUrls: ['./profil-korisnik.component.css']
})
export class ProfilKorisnikComponent implements OnInit {

  kupljeneKarte: Array<Karta>;

  constructor(private router: Router, private izlistajKarteServis: IzlistavanjeKarataService) { }

  ngOnInit() {
    this.izlistajKarteServis.getKarteUlogovanog().subscribe(data => {
        this.kupljeneKarte = data as Array<Karta>;
    });
  }
  get user(): any {
    return JSON.parse(localStorage.getItem('ulogovan')) as PrijavljenKorisnik;
  }

}
