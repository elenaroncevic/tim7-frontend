import { Component, OnInit } from '@angular/core';
import { Zona, Linija } from '../model/Linija';
import { ZoneService } from '../zone.service';
import { LinijeService } from '../linije.service';


@Component({
  selector: 'app-admin-zone',
  templateUrl: './admin-zone.component.html',
  styleUrls: ['./admin-zone.component.css']
})
export class AdminZoneComponent implements OnInit {
    title: string;
    zones: Zona[];
    currentZone: Zona;
    showZone: boolean;
    loadingZone: boolean;
    lines: Linija[];


  constructor(private zoneService: ZoneService, private linijeService: LinijeService) { }

  ngOnInit() {
        this.currentZone = null;
        this.showZone = false;
        this.loadingZone = true;
        this.title = 'Ucitavaju se zone, pricekajte nekoliko sekundi';
        this.zoneService.getZone()
            .then((response) => {
                this.zones = response;
                this.title = 'ZONE';
            }).catch((error) => {
                console.log(error);
                this.title = 'Problem sa ucitavanjem, pokusajte ponovo uskoro';
            });
  }

  openZoneInfo(zona: Zona) {
    this.currentZone = zona;
    this.linijeService.getLinije(zona)
            .then((response) => {
                this.lines = response;
                this.showZone = true;
                this.loadingZone = false;
            }).catch((error) => {
                console.log(error);
            });
  }


  saveChanges() {
    this.zoneService.updateZone(this.currentZone)
            .then((response) => {
                this.showZone = false;
            }).catch((error) => {
                console.log(error);
            });
  }

  removeLine(line: Linija) {
      this.zoneService.removeLineFromZone(this.currentZone, line.id)
            .then((response) => {
                this.lines = response;
            }).catch((error) => {
                console.log(error);
            });
  }

  deleteZone() {
      this.zoneService.deleteZone(this.currentZone)
            .then((response) => {
                this.showZone = false;
            }).catch((error) => {
                console.log(error);
            });
  }



}
