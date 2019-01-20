import { Component, OnInit } from '@angular/core';
import {Cenovnik} from '../model/Cenovnik';
import {StavkaCenovnika} from '../model/stavkaCenovnika';
import{CenovnikService} from '../cenovnik.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms'
import * as moment from 'moment';

@Component({
  selector: 'app-form-cenovnik',
  templateUrl: './form-cenovnik.component.html',
  styleUrls: ['./form-cenovnik.component.css']
})
export class FormCenovnikComponent implements OnInit {
  cenovnik : Cenovnik = new Cenovnik();

  dodajCenovnikForm: FormGroup;

  datumControl: FormControl;
  cenaControl: FormControl;
  tipControl: FormControl;
  prevozControl: FormControl;
  zonaControl: FormControl;
  linijaControl: FormControl;

  cena:number;
  tipKarte: string;
  vrstaPrevoza: string;
  nazivZone: string;
  nazivLinije: string;


  constructor() {
    this.createFormControls();
    this.createForm();
  }

  ngOnInit() {
  }

  
  createFormControls() {
  
    this.datumControl = new FormControl('', [Validators.required, this.ValidateDate]);
    this.cenaControl = new FormControl('', Validators.required);
    this.tipControl =  new FormControl('', Validators.required);
    this.prevozControl =  new FormControl('', Validators.required);
    this.zonaControl =  new FormControl('', Validators.required);
    this.linijaControl =  new FormControl('', Validators.required );   
  }

  ValidateDate(control: AbstractControl) {
    var tomorow = moment().add(2, 'd').startOf('day');
    var date = moment(control.value.toString);
    console.log(tomorow, date);

    if (date.isAfter(tomorow) ) {
      return { validDate: true };
    }
    return null;
  }

  createForm() {
    this.dodajCenovnikForm = new FormGroup({
      datum: this.datumControl,
      cena: this.cenaControl,
      tipKarte: this.tipControl,
      vrstaPrevoza: this.prevozControl,
      zona: this.zonaControl,
      linija: this.linijaControl     
    });
  }
}
