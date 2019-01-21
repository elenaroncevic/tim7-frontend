import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { PrijavljenKorisnik } from '../model/PrijavljenKorisnik';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Korisnik } from '../model/Korisnik';
import { IzmenaLozinkeService } from '../izmena-lozinke.service';

@Component({
  selector: 'app-izmena-lozinke',
  templateUrl: './izmena-lozinke.component.html',
  styleUrls: ['./izmena-lozinke.component.css']
})
export class IzmenaLozinkeComponent implements OnInit {

  lozinkaForm: FormGroup;
  trenutna: FormControl;
  nova1: FormControl;
  nova2: FormControl;

  korisnik: Korisnik;

  constructor(private router: Router, private izmenaLozinkeService: IzmenaLozinkeService) {

    this.createFormControls();
    this.createForm();
  }
  createFormControls() {
    this.trenutna = new FormControl('', [Validators.required]);
    this.nova1 = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.nova2 = new FormControl('', [Validators.required]);

  }

  createForm() {
    this.lozinkaForm = new FormGroup({
      trenutna: this.trenutna,
      nova1: this.nova1,
      nova2: this.nova2
    });
  }
  ngOnInit() {
 
  }

  izmenaLozinke() {
    this.trenutna.markAsTouched();
    this.nova1.markAsTouched();
    this.nova2.markAsTouched();
   

    if (this.lozinkaForm.valid) {
      this.korisnik = new Korisnik();
      this.korisnik.lozinka1 = this.nova1.value;
      this.korisnik.lozinka2 = this.nova2.value;
      this.korisnik.trenutnaLozinka = this.trenutna.value;

      this.izmenaLozinkeService.izmenaLozinke(this.korisnik);
    }
  }

  otkazi() {
    this.lozinkaForm.reset();
    this.router.navigate(['/profilKorisnik']);
  }

  get user(): any {
    return JSON.parse(localStorage.getItem('ulogovan')) as PrijavljenKorisnik;
  }

}
