import { Component, OnInit } from '@angular/core';
import { RegistracijaService } from '../registracija.service';
import { Korisnik } from '../model/Korisnik';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {
  ngOnInit(){}

  kor: Korisnik;

  registracijaForm: FormGroup;

  korIme: FormControl;
  lozinka1: FormControl;
  lozinka2: FormControl;
  email: FormControl;
  ime: FormControl;
  prezime: FormControl;

  constructor(private regServis: RegistracijaService) {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.korIme = new FormControl('', Validators.required);
    this.lozinka1 = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.lozinka2 = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.ime = new FormControl('', Validators.required);
    this.prezime = new FormControl('', Validators.required);
  }

  createForm() {
    this.registracijaForm = new FormGroup({
      korIme: this.korIme,
      ime: this.ime,
      prezime: this.prezime,
      email: this.email,
      lozinka1: this.lozinka1,
      lozinka2: this.lozinka2
    });
  }
  private onSubmit() {
    console.log(this.registracijaForm)
    if (this.registracijaForm.valid) {
      console.log("Form Submitted!");
      this.kor = new Korisnik();
      this.kor.korIme = this.registracijaForm.controls.korIme.value;
      this.kor.ime = this.registracijaForm.controls.ime.value;
      this.kor.prezime = this.registracijaForm.controls.prezime.value;
      this.kor.email = this.registracijaForm.controls.email.value;
      this.kor.lozinka1 = this.registracijaForm.controls.lozinka1.value;
      this.kor.lozinka2 = this.registracijaForm.controls.lozinka2.value;
      this.regServis.post(this.kor);
      this.registracijaForm.reset();
    }
  }
}