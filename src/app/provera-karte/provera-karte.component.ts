import { Component, OnInit } from '@angular/core';
import { LinijeService } from '../linije.service';
import { Linija, Zona } from '../model/Linija';
import { CheckKartaService } from '../check-karta.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-provera-karte',
  templateUrl: './provera-karte.component.html',
  styleUrls: ['./provera-karte.component.css']
})
export class ProveraKarteComponent implements OnInit {

  listaLinija: Linija[];
  tipPrevoza:string;
  izabranaLinija:string;
  kodKarte:FormControl;
  proveraKarteForm:FormGroup;

  constructor(private linijeService:LinijeService, private checkKartaService:CheckKartaService) {
    this.createFormControls();
    this.createForm();
   }


  ngOnInit() {
    this.getSveLinije();
    this.tipPrevoza="AUTOBUS";
    
  }


  createFormControls() {
    this.kodKarte = new FormControl('', [Validators.required, Validators.maxLength(8)]);
   
  }

  createForm() {
    this.proveraKarteForm = new FormGroup({
      kodKarte:this.kodKarte
     
    });
  }


  getSveLinije() {
    this.linijeService.getLinije({"id":null})
        .then((response) => {
            this.listaLinija = response;
        }).catch((error) => {
            console.log(error);
        });
  }

  proveriKartu(){  
    if (this.proveraKarteForm.valid) {   
      this.checkKartaService.proveriKartu(this.tipPrevoza, this.izabranaLinija, this.kodKarte.value);
        

      this.proveraKarteForm.reset();
    }else{
      this.kodKarte.markAsTouched();
    }
  }

  resetKodPolje(){
    this.proveraKarteForm.reset();
  }
}
