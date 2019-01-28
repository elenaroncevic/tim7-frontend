import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { PrijavljenKorisnik } from '../model/PrijavljenKorisnik';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Korisnik } from '../model/Korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-uredjivanje-profila',
  templateUrl: './uredjivanje-profila.component.html',
  styleUrls: ['./uredjivanje-profila.component.css']
})
export class UredjivanjeProfilaComponent implements OnInit {
  uredjivanjeForm: FormGroup;
  ime: FormControl;
  prezime: FormControl;
  email: FormControl;
  korisnik: Korisnik;

  constructor(private router: Router, private izmenaPodatakService: KorisnikService) {

    this.createFormControls();
    this.createForm();
  }
  createFormControls() {
    this.ime = new FormControl('', [Validators.required]);
    this.prezime = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]);

  }

  createForm() {
    this.uredjivanjeForm = new FormGroup({
      ime: this.ime,
      prezime: this.prezime,
      email: this.email
    });
  }
  ngOnInit() {
    this.ime.setValue(this.user.ime);
    this.prezime.setValue(this.user.prezime);
    this.email.setValue(this.user.email);
  }

  izmenaProfila() {
    this.ime.markAsTouched();
    this.prezime.markAsTouched();
    this.email.markAsTouched();
    this.ime.markAsDirty();
    this.prezime.markAsDirty();
    this.email.markAsDirty();

    if (this.uredjivanjeForm.valid) {
      this.korisnik = new Korisnik();
      this.korisnik.ime = this.ime.value;
      this.korisnik.prezime = this.prezime.value;
      this.korisnik.email = this.email.value;

      this.izmenaPodatakService.izmenaLicnihPodataka(this.korisnik);
    }
  }

  otkazi() {
    this.uredjivanjeForm.reset();
    this.router.navigate(['/profilKorisnik']);
  }

  get user(): any {
    return JSON.parse(localStorage.getItem('ulogovan')) as PrijavljenKorisnik;
  }

}
