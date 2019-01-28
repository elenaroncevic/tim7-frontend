import { Component, OnInit } from '@angular/core';
import { GetLinijeZoneService } from '../get-linije-zone.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Karta } from '../model/Karta';
import { KartaService } from '../karta.service';
import { PrijavljenKorisnik } from '../model/PrijavljenKorisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kupovina-karte',
  templateUrl: './kupovina-karte.component.html',
  styleUrls: ['./kupovina-karte.component.css']
})
export class KupovinaKarteComponent implements OnInit {

  karta: Karta;

  kupovinaKarteForma: FormGroup;
  kartaControl: FormControl;
  voziloControl: FormControl;
  rutaControl: FormControl;

  tipKarte = null;
  tipoviKarte: Array<Object> = [
    { name: "DNEVNA" },
    { name: "MESECNA" },
    { name: "GODISNJA" }
  ];

  tipVozila = null;
  tipoviVozila: Array<Object> = [
    { name: "AUTOBUS" },
    { name: "TRAMVAJ" },
    { name: "METRO" }
  ];

  ruta = null;
  tipRute = null;
  tipoviRute: Array<Object> = [];

  constructor(private zoneServis: GetLinijeZoneService, private kupovinaKarteServis: KartaService, private router: Router) {
    this.createFormControls();
    this.createForm();
  }
  createFormControls() {
    this.voziloControl = new FormControl('', [Validators.required]);
    this.kartaControl = new FormControl('', [Validators.required]);
    this.rutaControl = new FormControl('', [Validators.required]);

  }

  createForm() {
    this.kupovinaKarteForma = new FormGroup({
      voziloControl: this.voziloControl,
      kartaControl: this.kartaControl,
      rutaControl: this.rutaControl
    });
  }
  ngOnInit() {

  }

  promenaTipaRute() {
    while (this.tipoviRute.length > 0) {
      this.tipoviRute.pop();
    }
    this.ruta = null;
    this.rutaControl.reset();

    if (this.kartaControl.dirty && this.voziloControl.dirty) {

      if (this.tipKarte == "DNEVNA") {
        this.zoneServis.getZone().subscribe(data => {
          data.stavkeCenovnika.forEach(element => {
            if(element.tipKarte == this.tipKarte && element.vrstaPrevoza == this. tipVozila){
              if(this.unikat(this.tipoviRute, element.nazivLinije)){
                this.tipoviRute.push({ name: element.nazivLinije });
              }
            }
          });
          this.tipRute = "liniju";
        })
      } else {
        this.zoneServis.getZone().subscribe(data => {
          data.stavkeCenovnika.forEach(element => {
            if(element.tipKarte == this.tipKarte && element.vrstaPrevoza == this. tipVozila){
              if(this.unikat(this.tipoviRute, element.nazivZone)){
                this.tipoviRute.push({ name: element.nazivZone });
              }
            }
          });
          this.tipRute = "zonu";
        })
      }
    }
  }

  unikat(lista,element){
    var retval = true;
    lista.forEach(el => {
      if(el.name == element){
        retval = false;
      }
    });
    return retval;
  }

  kupiKartu() {
    if (this.kupovinaKarteForma.valid) {
      var ulogovan = JSON.parse(localStorage.getItem('ulogovan')) as PrijavljenKorisnik;
      if (this.tipKarte != "DNEVNA" && ulogovan.status == null) {
        alert("Nije potvrdjen vas status. Proverite da li ste prilozili potvrdu.")
      } else {
        this.karta = new Karta();
        this.karta.tipKarte = this.tipKarte;
        this.karta.linijaZona = this.ruta;
        this.karta.tipPrevoza = this.tipVozila;
        this.karta.statusKorisnika = ulogovan.status;
        this.kupovinaKarteServis.kupiKartu(this.karta);
      }
      this.tipKarte = null;
      this.ruta = null;
      this.tipVozila = null;
      this.kupovinaKarteForma.reset();

    } else {
      this.kartaControl.markAsTouched();
      this.rutaControl.markAsTouched();
      this.voziloControl.markAsTouched();

    }
  }

  otkazi() {
    this.kupovinaKarteForma.reset();
    this.router.navigate(['/profilKorisnik']);
  }
}
