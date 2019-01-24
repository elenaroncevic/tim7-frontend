import { Component, OnInit } from '@angular/core';
import { GetLinijeService } from '../get-linije.service';
import { GetZoneService } from '../get-zone.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Karta } from '../model/Karta';
import { KupovinaKarteService } from '../kupovina-karte.service';
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

  constructor(private linijeServis: GetLinijeService, private zoneServis: GetZoneService, private kupovinaKarteServis: KupovinaKarteService, private router: Router) {
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
    if (this.tipKarte == "DNEVNA") {
      this.linijeServis.getLinije().subscribe(data => {
        data.forEach(element => {
          this.tipoviRute.push({ name: element.name });
        });
        this.tipRute = "liniju";
      })
    } else {
      this.zoneServis.getZone().subscribe(data => {
        data.forEach(element => {
          this.tipoviRute.push({ name: element.name });
        });
        this.tipRute = "zonu";
      })
    }
  }


  kupiKartu() {
    if (this.kupovinaKarteForma.valid) {
      var ulogovan = JSON.parse(localStorage.getItem('ulogovan')) as PrijavljenKorisnik;
      if (this.tipKarte!= "DNEVNA" && ulogovan.status == null) {
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
