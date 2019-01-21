import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { PrijavljenKorisnik } from '../model/PrijavljenKorisnik';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Korisnik } from '../model/Korisnik';
import { IzmenaLicnihPodatakaService } from '../izmena-licnih-podataka.service';

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

  constructor(private router: Router, private izmenaPodatakService : IzmenaLicnihPodatakaService) { 

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


  }

  izmenaProfila() {
    
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

  get user(): any{
    return JSON.parse(localStorage.getItem('ulogovan')) as PrijavljenKorisnik;
 }

}
