import { Component, OnInit } from '@angular/core';
import { PrijavaService } from '../prijava.service';
import { Login } from '../model/Login';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TipKorisnikaService } from '../tip-korisnika.service';
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
  
  constructor(private prijavaService: PrijavaService) {
    this.createFormControls();
    this.createForm();
   }

  ngOnInit() {
  }

  
  createFormControls() {
    this.korIme = new FormControl('', Validators.required);
    this.lozinka1 = new FormControl('', [Validators.required]);
   
  }

  createForm() {
    this.prijavaForm = new FormGroup({
      korIme: this.korIme,
      lozinka1: this.lozinka1,
     
    });
  }
  private onSubmit() {
   
    if (this.prijavaForm.valid) {
      this.kor = new Login();
      this.kor.username = this.prijavaForm.controls.korIme.value;
      this.kor.password = this.prijavaForm.controls.lozinka1.value;
      this.prijavaService.post(this.kor);
      
      this.prijavaForm.reset();
    }else{
      this.korIme.markAsTouched();
      this.lozinka1.markAsTouched();
    }
  }
}
