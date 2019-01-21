import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { PrijavljenKorisnik } from '../model/PrijavljenKorisnik';

import { OnInit } from '@angular/core';
@Component({
  selector: 'app-profil-korisnik',
  templateUrl: './profil-korisnik.component.html',
  styleUrls: ['./profil-korisnik.component.css']
})
export class ProfilKorisnikComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  get user(): any{
    return JSON.parse(localStorage.getItem('ulogovan')) as PrijavljenKorisnik;
 }

}
