import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RasporedVoznje } from '../model/RasporedVoznje';
import { RasporedVoznjeService } from '../raspored-voznje.service';

@Component({
  selector: 'app-trenutni-raspored',
  templateUrl: './trenutni-raspored.component.html',
  styleUrls: ['./trenutni-raspored.component.css']
})
export class TrenutniRasporedComponent implements OnInit {

  linijeRasporeda:string[];
  daniUNedelji:string[];

  rasporediVoznje:RasporedVoznje[];

  izabranaLinija:string;
  izabraniDan:string;

  izabraniRaspored:RasporedVoznje;

  postojeRasporedi:boolean;
  prikazRasporeda:boolean;

  prikazRasporedaForma: FormGroup;
  linijaControl: FormControl;
  danControl: FormControl;

  constructor(private rasporedVoznjeService:RasporedVoznjeService) {
    this.createFormControls();
    this.createForm(); 
  }


  createFormControls() {
    this.danControl = new FormControl('', [Validators.required]);
    this.linijaControl = new FormControl('', [Validators.required]);

  }

  createForm() {
    this.prikazRasporedaForma = new FormGroup({
      danControl: this.danControl,
      linijaControl: this.linijaControl
    });
  }


  ngOnInit() {
    this.rasporediVoznje=[];
    this.izabranaLinija=null;
    this.izabraniDan=null;
    this.linijeRasporeda=[];
    this.daniUNedelji=[];
    this.izabraniRaspored={"id":null,"vremena":[],"danUNedelji":null,"nazivLinije":null};
    this.prikazRasporeda=false;
    this.dobaviRasporede();
  }

  dobaviRasporede(){
    this.rasporedVoznjeService.dobaviTrenutneRasporede()
        .then((response) => {
            this.rasporediVoznje=response;
            console.log(response);
            this.postojeRasporedi=true;
            this.popuniLinije();
            this.popuniDaneUNedelji();
        }).catch((error) => {
            console.log(error);
            this.postojeRasporedi=false;
        });
  }

  popuniLinije(){
    for (let raspored of this.rasporediVoznje){
      if (!this.linijeRasporeda.includes(raspored.nazivLinije)){
        this.linijeRasporeda.push(raspored.nazivLinije);
      }
    }
  }

  popuniDaneUNedelji(){
    for (let raspored of this.rasporediVoznje){
      if (!this.daniUNedelji.includes(raspored.danUNedelji)){
        this.daniUNedelji.push(raspored.danUNedelji);
      }
    }
  }


  promenaLinije(){
    this.daniUNedelji=[];
    for (let raspored of this.rasporediVoznje){
      if (raspored.nazivLinije===this.izabranaLinija){
        if (!this.daniUNedelji.includes(raspored.danUNedelji)){
          this.daniUNedelji.push(raspored.danUNedelji);
        }
        
      }
    }
  }

  promenaDana(){
    this.linijeRasporeda=[];
    for (let raspored of this.rasporediVoznje){
      if (raspored.danUNedelji===this.izabraniDan){
        if (!this.linijeRasporeda.includes(raspored.nazivLinije)){
          this.linijeRasporeda.push(raspored.nazivLinije);
        }
        
      }
    }
  }

  prikaziRaspored(){
    if (this.prikazRasporedaForma.valid) {
      var podaci={"id":null,"vremena":[],"danUNedelji":this.izabraniDan,"nazivLinije":this.izabranaLinija};
      this.rasporedVoznjeService.dobaviJedanTrenutniRaspred(podaci)
        .then((response) => {
            this.izabraniRaspored=response;
            this.prikazRasporeda=true;
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }else{
      this.linijaControl.markAsTouched();
      this.danControl.markAsTouched();
    }
  }

}




