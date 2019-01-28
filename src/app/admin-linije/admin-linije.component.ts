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
    lines: Linija[];

    // liste objekata za dropdown-s
    zones: Zona[];
    stations: Stanica[];
    vehicles: Vozilo[];



  constructor(private lineService: LinijeService, private zoneService: ZoneService,
    private vehicleService: VehicleService, private stationService: StationService) { }

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

  openLineInfo(line) {
    this.loadingLine = true;
    this.currentLine = line;
    if (this.zones.length === 0) {
        this.loadAllZones();
    }
  }

  newLine() {
      this.loadingLine = true;
  }

  removeStationFromLine(station: Stanica) {
    
  }

  zoneAdded(zone: any) {

  }

  zoneRemoved(zone: any) {

  }

  vehicleAdded(vehicle: any) {

  }

  vehicleRemoved(vehicle: any) {

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
