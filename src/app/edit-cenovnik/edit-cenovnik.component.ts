import { Component, OnInit } from '@angular/core';
import {Cenovnik} from '../model/Cenovnik';
import {StavkaCenovnika} from '../model/stavkaCenovnika';
import{CenovnikService} from '../cenovnik.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms'
import {CenovnikComponent} from '../cenovnik/cenovnik.component'
import * as moment from 'moment';


@Component({
  selector: 'app-edit-cenovnik',
  templateUrl: './edit-cenovnik.component.html',
  styleUrls: ['./edit-cenovnik.component.css']
})
export class EditCenovnikComponent implements OnInit {

  cenovnici : Cenovnik[];
  loading: boolean;
  selected : boolean;
  selectedCenovnik: Cenovnik;
  hasItems: boolean;
  showEdit : boolean;
  cenovnikForm: FormGroup;
  stavkaForm: FormGroup;

  editedCenovnik : Cenovnik;

  datumControl: FormControl;
  cenaControl: FormControl;
  popustDjakControl: FormControl;
  popustStudentControl: FormControl;
  popustPenzionerControl: FormControl;
  popustNezaposlenControl: FormControl;

  constructor(private cenovnikService: CenovnikService) {
     if(localStorage.getItem('X-Auth-Token')){
      this.createFormControls();
      this.createForms();
    }
  }

 
  onChange(selected) {
    console.log(selected);
    this.selectedCenovnik = selected;
  }


  ngOnInit() {
    this.editedCenovnik = new Cenovnik();
    this.showEdit = false;
    this.loading = true;
    this.cenovnikService.getBuduci()
    .then((response)=>{
      this.cenovnici = response;
      if(this.cenovnici.length>0){
      this.hasItems = true;
        this.selectedCenovnik = this.cenovnici[0];
      }
      else{
        this.hasItems = false;
      }
      this.loading = false;
    }).catch((error)=>{
      this.hasItems=false;
      console.log(error);
    });

  }
   createFormControls() {
  
    this.datumControl = new FormControl('', this.ValidateDate);
    this.popustDjakControl =  new FormControl('');
    this.popustNezaposlenControl =  new FormControl('' );
    this.popustStudentControl =  new FormControl('');
    this.popustPenzionerControl =  new FormControl('' );
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
  }

  resetControlsMain(){
    this.datumControl.reset();
    this.popustDjakControl.reset();
    this.popustNezaposlenControl.reset();
    this.popustPenzionerControl.reset();
    this.popustStudentControl.reset();
  }

   editCenovnik(form){
    console.log("cao");
    if(this.cenovnikForm.valid){
      this.editedCenovnik.id = this.selectedCenovnik.id;
      this.editedCenovnik.datumObjavljivanja = this.datumControl.value;
      this.editedCenovnik.popustDjak = this.popustDjakControl.value;
      this.editedCenovnik.popustNezaposlen = this.popustNezaposlenControl.value;
      this.editedCenovnik.popustPenzioner = this.popustPenzionerControl.value;
      this.editedCenovnik.popustStudent = this.popustStudentControl.value;
      console.log(this.editedCenovnik);
      this.cenovnikService.editCenovnik(this.editedCenovnik)
      .then((response)=>{
        this.selectedCenovnik = response;
        this.cenovnikService.getBuduci()
        .then((response)=>{
          this.cenovnici = response;
          if(this.cenovnici.length>0){
          this.hasItems = true;
          }
          else{
            this.hasItems = false;
          }
          this.loading = false;
        }).catch((error)=>{
          this.hasItems=false;
          console.log(error);
        });
        this.showEdit = false;
        form.resetForm();
       }).catch((error)=>{
          console.log(error);
       });    
    }
   
    if(!this.cenovnikForm.valid){
      this.popustDjakControl.markAsTouched();
      this.popustStudentControl.markAsTouched();
      this.popustPenzionerControl.markAsTouched();
      this.popustNezaposlenControl.markAsTouched();

      this.datumControl.markAsTouched();
    }

   
  }
 show(){

    this.showEdit = !this.showEdit;
    console.log(this.showEdit);
 }


}
