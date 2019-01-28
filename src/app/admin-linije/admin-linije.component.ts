import { Component, OnInit } from '@angular/core';
import { LinijeService } from '../linije.service';
import { Linija, Zona } from '../model/Linija';
import { Stanica } from '../model/Stanica';
import { Vozilo } from '../model/Vozilo';
import { VehicleService } from '../vehicle.service';
import { ZoneService } from '../zone.service';
import { StationService } from '../station.service';

@Component({
  selector: 'app-admin-linije',
  templateUrl: './admin-linije.component.html',
  styleUrls: ['./admin-linije.component.css']
})
export class AdminLinijeComponent implements OnInit {

    showLine: boolean;
    loadingLine: boolean;
    dropdownSettings: any;
    dropdownSettingsVeh: any;
    currentLine: Linija;
    title: string;
    title_line: string;
    lines: Linija[];
    hasAccess: boolean;
    added: boolean;

    // liste objekata za dropdown-s
    zones: Zona[];
    stations: Stanica[];
    vehicles: Vozilo[];



  constructor(private lineService: LinijeService, private zoneService: ZoneService,
    private vehicleService: VehicleService, private stationService: StationService) {
        this.hasAccess = true;
     }

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
    this.dropdownSettingsVeh = {
        singleSelection: false,
        idField: 'id',
        textField: 'registration',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 7,
        allowSearchFilter: true
    };
    // dropdown
    this.zones = [];
    this.lines = [];
    this.vehicles = [];
    this.currentLine = {'id': null, 'name': '', 'zones': [], 'vehicles': [], 'stations': []};
    this.added = false;

    this.title = 'Ucitavaju se linije, pricekajte nekoliko sekundi';
    this.showLine = false;
    this.loadingLine = false;
    this.lineService.getLinije(null)
        .then((response) => {
            this.lines = response;
            this.title = 'LINIJE';
        }).catch((error) => {
            this.title = 'Problem prilikom ucitavanja, osvjezite stranicu i pokusajte ponovo';
        });
  }

  openLineInfo(line: any) {
      this.hasAccess = true;
    this.loadingLine = true;
    this.currentLine = JSON.parse(JSON.stringify(line));
    if (this.zones.length === 0) {
        this.loadAllZones();
    } else {
        this.loadingLine = false;
        this.showLine = true;
    }
  }

  newLine() {
    this.loadingLine = true;
    this.currentLine = {'id': null, 'name': '', 'zones': [], 'vehicles': [], 'stations': []};
    if (this.zones.length === 0) {
        this.loadAllZones();
    } else {
        this.loadingLine = false;
        this.showLine = true;
    }

  }

  saveChanges() {
    if (this.currentLine.name === '') {
        return;
    }
    this.showLine = false;
    this.title_line = 'Cuvanje linije u toku, pricekajte';
    this.loadingLine = false;
    this.lineService.updateLine(this.currentLine)
        .then((response) => {
            this.lines = response;
            this.loadingLine = false;
            this.title_line = 'Linija sacuvana, izaberite novu za uredjivanje informacija';
        }).catch((error) => {
            this.loadingLine = false;
            this.title_line = 'Problem prilikom cuvanja podataka, pokusajte ponovo\nImajte na umu da linija ne smije da se koristi u' +
            'trenutnom cjenovniku i/ili u trenutnom/buducem redu voznje';
        });
  }

  deleteZone() {
      this.loadingLine = true;
      this.showLine = false;
      this.title_line = 'Brisanje linije u toku, pricekajte';
     this.lineService.deleteLine(this.currentLine.id)
        .then((response) => {
            this.lines = response;
            this.loadingLine = false;
            this.title_line = 'Linija izbrisana, izaberite novu za uredjivanje informacija';
        }).catch((error) => {
            this.loadingLine = false;
            this.showLine = false;
            this.title_line = 'Problem prilikom brisanja podataka, pokusajte ponovo';
        });
  }


  addStationToLine(latlng: any) {
     this.currentLine.stations.push({'id': null, 'name': 'new_station', 'longitude': latlng.lng(), 'latitude': latlng.lat()});
  }

  removeStationFromLine(station: Stanica) {
    this.currentLine.stations.splice(this.currentLine.stations.indexOf(station), 1);
  }

  // loading dropdown items
  loadAllZones() {
    this.zoneService.getZones()
        .then((response) => {
            this.zones = response;
            this.loadAllVehicles();
        }).catch((error) => {
            this.loadingLine = false;
            this.title = 'Problem prilikom ucitavanja, osvjezite stranicu i pokusajte ponovo';
        });
  }

  loadAllVehicles() {
    this.vehicleService.getVehicles()
        .then((response) => {
            this.vehicles = response;
            this.showLine = true;
            this.loadingLine = false;
        }).catch((error) => {
            this.loadingLine = false;
            this.title = 'Problem prilikom ucitavanja, osvjezite stranicu i pokusajte ponovo';
        });

  }

}
