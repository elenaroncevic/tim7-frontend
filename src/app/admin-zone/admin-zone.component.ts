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
    title_zone: string;
    zones: Zona[];
    currentZone: Zona;
    showZone: boolean;
    loadingZone: boolean;
    lines: Linija[];
    allLines: Linija[];
    dropdownSettings: any;

    removedLinesIds: number[];


  constructor(private zoneService: ZoneService, private linijeService: LinijeService) { }

  ngOnInit() {
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 7,
            allowSearchFilter: true
        };
        this.currentZone = null;
        this.showZone = false;
        this.loadingZone = false;
        this.allLines = [];
        this.title = 'Ucitavaju se zone, pricekajte nekoliko sekundi';
        this.title_zone = 'Izaberi zonu za prikaz informacija';
        this.zoneService.getZone()
            .then((response) => {
                this.zones = response;
                this.title = 'ZONE';
            }).catch((error) => {
                this.title = 'Problem sa ucitavanjem, pokusajte ponovo uskoro';
            });
  }

    loadAllLines() {
      this.linijeService.getLinije(null)
            .then((response) => {
                this.allLines = response;
                this.showZone = true;
                this.loadingZone = false;
            }).catch((error) => {
                this.loadingZone = false;
                this.title_zone = 'Problem prilikom ucitavanja, osvjezite stranicu i pokusajte ponovo';
            });
  }

  openZoneInfo(zona: Zona) {
    this.removedLinesIds = [];

    this.currentZone = zona;
    this.loadingZone = true;
    this.title_zone = 'Ucitava se zona ' + zona.name + ', pricekajte par sekundi';
    this.linijeService.getLinije(zona)
            .then((response) => {
                this.lines = response;
                if (this.allLines.length === 0) {
                    this.loadAllLines();
                } else {
                    this.showZone = true;
                    this.loadingZone = false;
                }
            }).catch((error) => {
                this.loadingZone = false;
                this.showZone = false;
                this.title_zone = 'Problem prilikom ucitavanja, osvjezite stranicu i pokusajte ponovo';
            });
  }


  saveChanges() {
            const updatedZone = {'id': this.currentZone.id, 'name': this.currentZone.name, 'lines': this.lines,
             'removedLines': this.removedLinesIds};

            this.showZone = false;
            this.loadingZone = true;
            this.title_zone = 'Cuvanje zone u toku, pricekajte';
            this.zoneService.updateZone(updatedZone)
                .then((response) => {
                    this.zones = response;
                    this.loadingZone = false;
                    this.title_zone = 'Zona sacuvana, izaberite novu za prikaz informacija';
                }).catch((error) => {
                    this.loadingZone = false;
                    this.title_zone = 'Problem prilikom cuvanja podataka i pokusajte ponovo';
                });
        }

  deleteZone() {
      if ( this.currentZone.id === null) {
          this.showZone = false;
          this.title_zone = 'Izaberite zonu za prikaz informacija';
          return;
      }
      this.showZone = false;
      this.loadingZone = true;
      this.title_zone = 'Brisanje zone u toku, pricekajte';
      this.zoneService.deleteZone(this.currentZone)
            .then((response) => {
                this.loadingZone = false;
                this.title_zone = 'Zona izbrisana, izaberite novu za prikaz informacija';
                this.zones = response;
            }).catch((error) => {
                this.loadingZone = false;
                this.title_zone = 'Problem prilikom brisanja zone, osvjezite stranicu i pokusajte ponovo';
            });
  }

  newZone() {
      this.currentZone = {'id': null, 'name': ''};
      this.lines = [];
      if ( this.allLines.length === 0) {
          this.loadingZone = true;
          this.loadAllLines();
      } else {
          this.showZone = true;
      }
  }

  lineRemoved(linija: any) {
    if (!this.removedLinesIds.includes(linija.id)) {
        this.removedLinesIds.push(linija.id);
        alert(this.removedLinesIds.length);
    }
  }

  lineAdded (linija: any) {
    if (this.removedLinesIds.includes(linija.id)) {
        this.removedLinesIds.splice( this.removedLinesIds.indexOf(linija.id), 1);
        alert(this.removedLinesIds.length);
    }
  }


}
