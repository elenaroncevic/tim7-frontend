import { Component, OnInit } from '@angular/core';
import { RasporedVoznjeService } from '../raspored-voznje.service';
import { LinijeService } from '../linije.service';
import { RedVoznje } from '../model/RedVoznje';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RasporedVoznje } from '../model/RasporedVoznje';
import { Time } from '@angular/common';
import { Linija } from '../model/Linija';

@Component({
  selector: 'app-red-voznje-manip',
  templateUrl: './red-voznje-manip.component.html',
  styleUrls: ['./red-voznje-manip.component.css']
})
export class RedVoznjeManipComponent implements OnInit {

  postojiRedVoznje:boolean;
  buduciRed:RedVoznje;
  novDatum:Date;
  postojeceLinije:Linija[];
  buduciRasporedi:RasporedVoznje[];

  prikazRasporedaForma: FormGroup;
  linijaControl:FormControl;
  danControl:FormControl;

  izabranaLinija:string;
  izabraniDan:string;

  prikazRasporeda:boolean;
  dodavanjeRasporeda:boolean;

  izabraniRaspored:RasporedVoznje;
  novaSatnica;
  kreiraniRaspored:RasporedVoznje;
  novDatum2:Date;

  loading:boolean;
  satnice:Time[];
  dodatak:string;

  constructor(private rasporedVoznjeService:RasporedVoznjeService, private linijaService:LinijeService) { 
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
    this.postojiRedVoznje=false;
    this.buduciRed=null;
    this.postojeceLinije=[];
    this.buduciRasporedi=[];

    this.izabranaLinija=null;
    this.izabraniDan=null;

    this.prikazRasporeda=false;
    this.dodavanjeRasporeda=false;

    this.loading=true;

    this.izabraniRaspored={"id":null,"vremena":[],"danUNedelji":null,"nazivLinije":null};
    this.kreiraniRaspored={"id":null,"vremena":[],"danUNedelji":null,"nazivLinije":null};

    this.dobaviBuduciRed();
  }


  dobaviLinije(){
    this.linijaService.getLinije(null)
        .then((response) => {
            this.postojeceLinije=response;
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
  }

  dobaviBuduciRed(){
    this.rasporedVoznjeService.dobaviBuduciRedVoznje()
        .then((response) => {
            this.buduciRed=response;
            this.postojiRedVoznje=true;
            this.loading=false;
            this.dobaviLinije();
            console.log(response);
        }).catch((error) => {
            this.postojiRedVoznje=false;
            console.log(error);
        });
  }

  prikaziRaspored(){
    if (this.prikazRasporedaForma.valid) {
      this.satnice=[];
      this.rasporedVoznjeService.dobaviBuduceRasporede()
        .then((response) => {
            this.buduciRasporedi=response;
            this.prikazRasporeda=false;
            this.dodavanjeRasporeda=false;
            for (let raspored of this.buduciRasporedi){
              if (raspored.danUNedelji==this.izabraniDan && raspored.nazivLinije==this.izabranaLinija){
                this.izabraniRaspored=raspored;
                this.prikazRasporeda=true;
              }
            }
            if (!this.prikazRasporeda){
              this.satnice=[];
              this.dodavanjeRasporeda=true;
              this.kreiraniRaspored={"id":null,"vremena":[],"danUNedelji":this.izabraniDan,"nazivLinije":this.izabranaLinija};
            }
            console.log(response);
        }).catch((error) => {
            this.satnice=[];
            this.dodavanjeRasporeda=true;
            console.log(this.izabraniDan);
            console.log(this.izabranaLinija);
            this.kreiraniRaspored={"id":null,"vremena":[],"danUNedelji":this.izabraniDan,"nazivLinije":this.izabranaLinija};
            console.log(error);
        });
    }else{
      this.linijaControl.markAsTouched();
      this.danControl.markAsTouched();
    }
  }


  kreirajRedVoznje(){
    if (this.novDatum2==null){
      alert("Datum je obavezan");
    }else{
      var red={"id":null, "rasporediVoznje":null, datumObjavljivanja:this.novDatum2};
      this.rasporedVoznjeService.kreirajRedVoznje(red)
        .then((response) => {
            this.linijaControl.markAsUntouched();
            this.danControl.markAsUntouched();
            this.buduciRed=response;
            this.postojiRedVoznje=true;
            this.dodavanjeRasporeda=false;
            this.prikazRasporeda=false;
            console.log(response);
        }).catch((error) => {
          alert(error.error);
            this.postojiRedVoznje=false;
            this.loading=false;
            console.log(error);
        });
    }
    
  }

  obrisiRaspored(){
    this.rasporedVoznjeService.obrisiRaspored(this.izabraniRaspored.id)
        .then((response) => {
          this.izabraniRaspored={"id":null,"vremena":[],"danUNedelji":null,"nazivLinije":null};
          this.linijaControl.markAsUntouched();
          this.danControl.markAsUntouched();
          this.dodavanjeRasporeda=false;
          this.prikazRasporeda=false;
          console.log(response);
        }).catch((error) => {
            console.log(error);
        });
  }

  dodajSatnicu(){
    if (!this.novaSatnica){
      alert("Satnica je obavezna");
    }else{
      console.log(this.novaSatnica);
      if (this.satnice.includes(this.novaSatnica)){
        alert("Vec postoji satnica u rasporedu");
      }else{
        this.dodatak=this.novaSatnica.hour+":"+this.novaSatnica.minute;
        this.satnice.push(this.novaSatnica);
        this.kreiraniRaspored.vremena.push(this.dodatak);
      }
    }
    
  }

  kreirajRaspored(){
    console.log(this.kreiraniRaspored.nazivLinije);
    console.log(this.kreiraniRaspored.danUNedelji);
    if (this.satnice.length==0){
      alert("Nije moguce kreirati raspored bez satnice");
    }else{
      this.rasporedVoznjeService.kreirajRaspored(this.kreiraniRaspored)
        .then((response) => {
          this.prikaziRaspored();
          console.log(response);
        }).catch((error) => {
            alert(error.error);
            console.log(error);
        });
    }
    
  }

  obrisiRedVoznje(){
    this.rasporedVoznjeService.obrisiBuduciRedVoznje()
        .then((response) => {
          this.postojiRedVoznje=false;
          console.log(response);
        }).catch((error) => {
            alert(error.error);
            console.log(error);
        });
  }

  izmenaDatuma(){
    var red={"id":null,"datumObjavljivanja":this.novDatum,"rasporediVoznje":null};
    this.rasporedVoznjeService.izmeniBuduciRedVoznje(red)
        .then((response) => {
          this.buduciRed.datumObjavljivanja=this.novDatum;
          console.log(response);
        }).catch((error) => {
            alert(error.error);
            console.log(error);
        });
  }






}
