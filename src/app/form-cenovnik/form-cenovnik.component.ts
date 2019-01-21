import { Component, OnInit } from '@angular/core';
import {Cenovnik} from '../model/Cenovnik';
import {StavkaCenovnika} from '../model/stavkaCenovnika';
import{CenovnikService} from '../cenovnik.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms'
import * as moment from 'moment';
import { Linija, Zona} from '../model/Linija'


@Component({
  selector: 'app-form-cenovnik',
  templateUrl: './form-cenovnik.component.html',
  styleUrls: ['./form-cenovnik.component.css']
})
export class FormCenovnikComponent implements OnInit {
  cenovnik : Cenovnik = new Cenovnik();

  linije : Linija[];

  cenovnikForm: FormGroup;

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

  showStavka: boolean;
  loading : boolean;

  constructor(private cenovnikService : CenovnikService) {
    this.createFormControls();
    this.createForm();
    
  }

  ngOnInit() {
    this.loading = true;
    this.showStavka = false;

    this.getData();
  }

  getData(){
    this.loading = true;
    this.cenovnikService.getLinije()
    .then((response)=>{
      this.linije = response;
      console.log(response);
      this.loading = false;
     }).catch((error)=>{
        console.log(error);
     });
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
    var date = moment(control.value);

    if (tomorow.isAfter(date) ) {
      return { validDate: true };
    }
    return null;
  }

  createForm() {
    this.cenovnikForm = new FormGroup({
      datumControl: this.datumControl,
      cenaControl: this.cenaControl,
      tipControl: this.tipControl,
      prevozControl: this.prevozControl,
      zonaControl: this.zonaControl,
      linijaControl: this.linijaControl     
    });
  }

  enableShowStavka(){
    this.showStavka = true;
    this.linijaChosen = false;
  }

 
}
