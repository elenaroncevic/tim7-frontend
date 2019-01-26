import { Component, OnInit, ViewChild, ElementRef, ContentChild, AfterContentInit } from '@angular/core';
import { Linija, Zona } from '../model/Linija';
import { MapComponent } from '../map/map.component';
import { map } from 'rxjs/operators';
import { ZoneService } from '../zone.service';
import { LinijeService } from '../linije.service';

@Component({
  selector: 'app-mreza-linija',
  templateUrl: './mreza-linija.component.html',
  styleUrls: ['./mreza-linija.component.css']
})
export class MrezaLinijaComponent implements OnInit {

    linije: Linija[];
    zones: Zona[];
    name_of_zone: string;
    title_zone: string;
    izabranaLinija: Linija;
    loadingLinije: boolean;



  constructor(private zoneService: ZoneService, private linijeService: LinijeService) { }

  ngOnInit() {
    this.loadingLinije = false;
    this.title_zone = 'Ucitavaju se zone, sacekajte par sekundi';
    this.getZone();
    this.name_of_zone = 'Izaberi zonu za prikaz linija';
    this.izabranaLinija = {'id': -1, 'name': 'null', 'zones': [], 'stations': []};

  }

  getLinije( zona) {
    this.name_of_zone = 'Ucitavaju se linije, sacekajte par sekundi';
    this.linije = [];
    this.loadingLinije = true;
    this.linijeService.getLinije(zona)
        .then((response) => {
            this.linije = response;
            this.name_of_zone = 'Linije u zoni: ' + zona.name;
            this.loadingLinije = false;
        }).catch((error) => {
            console.log(error);
            this.name_of_zone = 'Nema linija za izabranu zonu!';
            this.loadingLinije = false;
        });
  }

    getZone() {
        this.zoneService.getZones()
            .then((response) => {
                this.zones = response;
                const sve = {'id' : null, 'name': 'sve'};
                this.zones.push(sve);
                this.title_zone = 'ZONE';
            }).catch((error) => {
                console.log(error);
                this.title_zone = 'Problem sa ucitavanjem, pokusajte ponovo uskoro';
            });
    }

    showStanice( linija ) {
        this.izabranaLinija = linija;
    }
  }
