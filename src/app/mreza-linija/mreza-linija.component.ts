import { Component, OnInit, ViewChild, ElementRef, ContentChild, AfterContentInit } from '@angular/core';
import { MrezaLinijaService } from '../mreza-linija.service';
import { Linija, Zona } from '../model/Linija';
import { MapComponent } from '../map/map.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mreza-linija',
  templateUrl: './mreza-linija.component.html',
  styleUrls: ['./mreza-linija.component.css']
})
export class MrezaLinijaComponent implements OnInit, AfterContentInit {

    @ContentChild(MapComponent) mapa: MapComponent;
    linije: Linija[];
    zones: Zona[];
    name_of_zone: string;

    ngAfterContentInit() {
        alert(this.mapa.map.getCenter().lat);
    }



  constructor(private mrezaLinijaService: MrezaLinijaService) { }

  ngOnInit() {
    this.getZone();
    this.name_of_zone = 'Izaberi zonu za prikaz linija';
  }

  getLinije( zona) {
    this.mrezaLinijaService.getLinije(zona)
        .then((response) => {
            this.linije = response;
            this.name_of_zone = 'Linije u zoni: ' + zona.name;
        }).catch((error) => {
            console.log(error);
            this.linije = [];
            this.name_of_zone = 'Nema linija za izabranu zonu!';
        });
  }

    getZone() {
        this.mrezaLinijaService.getZone()
            .then((response) => {
                this.zones = response;
                const sve = {'id' : null, 'name': 'sve'};
                this.zones.push(sve);
            }).catch((error) => {
                console.log(error);
            });
    }

    showStanice( linija ) {
        this.mapa.mapProperties.center = new google.maps.LatLng(40.1234, 8.0266);
    }
  }
