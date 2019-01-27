import { Component, OnInit } from '@angular/core';
import {Cenovnik} from '../model/Cenovnik';
import {StavkaCenovnika} from '../model/stavkaCenovnika';
import{CenovnikService} from '../cenovnik.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms'
import * as moment from 'moment';
import {SveZaStavku} from '../model/Linija'


@Component({
  selector: 'app-form-cenovnik',
  templateUrl: './form-cenovnik.component.html',
  styleUrls: ['./form-cenovnik.component.css']
})
export class FormCenovnikComponent implements OnInit {
  cenovnik : Cenovnik = new Cenovnik();

  sveZaStavku: SveZaStavku;

  cenovnikForm: FormGroup;
  stavkaForm: FormGroup;

  datumControl: FormControl;
  cenaControl: FormControl;
  popustDjakControl: FormControl;
  popustStudentControl: FormControl;
  popustPenzionerControl: FormControl;
  popustNezaposlenControl: FormControl;

  tipControl: FormControl;
  prevozControl: FormControl;
  zonaControl: FormControl;
  linijaControl: FormControl;

  cena:number;
  tipKarte: string;
  vrstaPrevoza: string;
  nazivZone: string;
  nazivLinije: string;
  popustDjak: number;
  popustNezaposlen: number;
  popustPenzioner: number;
  popustStudent: number;

  showStavka: boolean;
  loading : boolean;

  constructor(private cenovnikService : CenovnikService) {
    this.createFormControls();
    this.createForms();
    
  }

  ngOnInit() {
    this.loading = true;
    this.showStavka = false;

    this.getData();
  }

  getData(){
    this.loading = true;
    this.cenovnikService.getSveZaStavku()
    .then((response)=>{
      this.sveZaStavku = response;
      this.sveZaStavku.zones = [];
      for(let linija of this.sveZaStavku.linije){
        for(let zona of linija.zones){
          this.sveZaStavku.zones.push(zona);
        }
      }
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
    this.zonaControl =  new FormControl('');
    this.linijaControl =  new FormControl('' );
    this.popustDjakControl =  new FormControl('', Validators.required );
    this.popustNezaposlenControl =  new FormControl('', Validators.required );
    this.popustStudentControl =  new FormControl('', Validators.required );
    this.popustPenzionerControl =  new FormControl('', Validators.required );
  }

  ValidateDate(control: AbstractControl) {
    var tomorow = moment().add(2, 'd').startOf('day');
    var date = moment(control.value);

    if (tomorow.isAfter(date) ) {
      return { validDate: true };
    }
    return null;
  }

  createForms() {
    this.cenovnikForm = new FormGroup({
     popustDjakControl: this.popustDjakControl,
      popustStudentControl : this.popustStudentControl,
      popustNezaposlenControl: this.popustNezaposlenControl,
      popustPenzionerControl: this.popustPenzionerControl,
      datumControl: this.datumControl});
    this.stavkaForm = new FormGroup({
      cenaControl: this.cenaControl,
      tipControl: this.tipControl,
      prevozControl: this.prevozControl,
      zonaControl: this.zonaControl,
      linijaControl: this.linijaControl     
    });
  }

  enableShowStavka(){
    this.showStavka = !this.showStavka;
  }

  resetControls(){
    this.cenaControl.reset();
    this.tipControl.reset();
    this.prevozControl.reset();
    this.linijaControl.reset();
    this.zonaControl.reset();
  }

  resetControlsMain(){
    this.datumControl.reset();
    this.popustDjakControl.reset();
    this.popustNezaposlenControl.reset();
    this.popustPenzionerControl.reset();
    this.popustStudentControl.reset();
  }

  addStavka(form){
    if(this.stavkaForm.valid){
      console.log(this.zonaControl.value);
      console.log(this.linijaControl.value);
      let stavka = new StavkaCenovnika({
          'cena' : this.cenaControl.value,
          'tipKarte' : this.tipControl.value,
          'vrstaPrevoza' : this.prevozControl.value,
          'nazivZone' : this.zonaControl.value,
          'nazivLinije' : this.linijaControl.value});
      this.cenovnik.stavkeCenovnika.push(stavka);
      console.log(this.cenovnik.stavkeCenovnika);
      form.resetForm();

    }
    else{
      this.cenaControl.markAsTouched();
      this.tipControl.markAsTouched();
      this.prevozControl.markAsTouched();
      this.linijaControl.markAsTouched();
      this.zonaControl.markAsTouched();
    }    
  }

  addCenovnik(form){
    console.log("cao");
    if(this.cenovnikForm.valid && this.cenovnik.stavkeCenovnika.length>0){
      this.cenovnik.datumObjavljivanja = this.datumControl.value;
      this.cenovnik.popustDjak = this.popustDjakControl.value;
      this.cenovnik.popustNezaposlen = this.popustNezaposlenControl.value;
      this.cenovnik.popustPenzioner = this.popustPenzionerControl.value;
      this.cenovnik.popustStudent = this.popustStudentControl.value;
      console.log(this.cenovnik);
      this.cenovnikService.addCenovnik(this.cenovnik)
      .then((response)=>{
        alert(response);
        form.resetForm();
      this.showStavka = false;
       }).catch((error)=>{
          console.log(error);
       });
      

    }
    if(this.cenovnik.stavkeCenovnika.length <= 0){
      console.log("Mora imati bar jednu stavku");
    }
    if(!this.cenovnikForm.valid){
      this.popustDjakControl.markAsTouched();
      this.popustStudentControl.markAsTouched();
      this.popustPenzionerControl.markAsTouched();
      this.popustNezaposlenControl.markAsTouched();

      this.datumControl.markAsTouched();
    }
  }
}
