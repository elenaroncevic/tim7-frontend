import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Login } from '../model/Login';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {
  kor: Login;
  prijavaForm: FormGroup;
  korIme: FormControl;
  lozinka1: FormControl;
  
  constructor(private prijavaService: KorisnikService) {

   }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  
  createFormControls() {
    this.korIme = new FormControl('', Validators.required);
    this.lozinka1 = new FormControl('', Validators.required);
   
  }

  createForm() {
    this.prijavaForm = new FormGroup({
      korIme: this.korIme,
      lozinka1: this.lozinka1,
     
    });
  }
  onSubmit() {
   
    if (this.prijavaForm.valid) {
      this.kor = new Login();
      this.kor.username = this.prijavaForm.controls.korIme.value;
      this.kor.password = this.prijavaForm.controls.lozinka1.value;
      this.prijavaService.prijava(this.kor);
      
      this.prijavaForm.reset();
    }else{
      this.korIme.markAsTouched();
      this.lozinka1.markAsTouched();
    }
  }
}
