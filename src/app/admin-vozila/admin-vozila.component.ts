import { Component, OnInit } from '@angular/core';
import { Vozilo } from '../model/Vozilo';
import { VehicleService } from '../vehicle.service';
import { Linija } from '../model/Linija';
import { LinijeService } from '../linije.service';

@Component({
  selector: 'app-admin-vozila',
  templateUrl: './admin-vozila.component.html',
  styleUrls: ['./admin-vozila.component.css']
})
export class AdminVozilaComponent implements OnInit {

    vehicles: Vozilo[];
    loadingVehicles: boolean;
    loadingVehicle: boolean;
    showVehicle: boolean;

    title_vehicles: string;
    title_vehicle: string;
    current_vehicle: Vozilo;
    allLines: Linija[];
    selectedLine: Linija;
    selectedType: string;
    allTypes: any;

    config: any;
    configTypes: any;

  constructor(private vehicleService: VehicleService, private linesService: LinijeService) { }

  ngOnInit() {
    this.config = {
        displayKey: 'name',
        height: 'auto',
        placeholder: 'Izaberi liniju',
      };
    this.configTypes = {
        height: 'auto',
        placeholder: 'Izaberi tip vozila',
    }
      this.allTypes = ['AUTOBUS', 'METRO', 'TRAMVAJ'];
      this.selectedType = 'AUTOBUS';
      this.allLines = [];
      this.loadingVehicles = true;
      this.loadingVehicle = false;
      this.showVehicle = false;
      this.title_vehicle = 'Izaberi vozilo da uredis podatke';
      this.title_vehicles = 'Vozila se ucitavaju, pricekajte par sekundi';
      this.vehicleService.getVehicles()
            .then((response) => {
                if ( response.length === 0) {
                    this.title_vehicles = 'Nema vozila za prikazivanje; dodajte nove vozila';
                } else {
                    this.vehicles = response;
                    this.title_vehicles = 'VOZILA';
                }
                this.loadingVehicles = false;
            }).catch((error) => {
                this.title_vehicles = 'Problem sa ucitavanjem, pokusajte ponovo uskoro';
            });
  }

  loadAllLines() {
    this.linesService.getLinije(null)
        .then((response) => {
            this.allLines = response;
            this.loadingVehicle = false;
            this.showVehicle = true;
            const list = this.allLines.filter(Line => Line.id === this.current_vehicle.lineId);
            if (list.length !== 0) {
                this.selectedLine = list[0];
            }
        }).catch((error) => {
            this.title_vehicle = 'Problem sa ucitavanjem, pokusajte ponovo uskoro';
            this.loadingVehicle = false;
        });
  }

  openVehicleInfo(vehicle: Vozilo) {
    this.current_vehicle = vehicle;
    this.loadingVehicle = true;
    this.selectedType = vehicle.type;
    if (this.allLines.length === 0) {
        this.loadAllLines();
    } else {
        this.loadingVehicle = false;
        this.showVehicle = true;
        const list = this.allLines.filter(Line => Line.id === vehicle.lineId);
        if (list.length !== 0) {
            this.selectedLine = list[0];
        }
    }
  }

  newVehicle() {
      this.current_vehicle = {'id': null, 'registration': '', 'type': '', 'lineId': null, 'lineName': ''};
      if ( this.allLines.length === 0) {
          this.loadingVehicle = true;
          this.loadAllLines();
      } else {
          this.showVehicle = true;
      }
  }

  saveChanges() {
            if (this.current_vehicle.registration === '' || this.selectedType === undefined) {
                return;
            }
            this.showVehicle = false;
            this.loadingVehicle = true;
            this.title_vehicle = 'Cuvanje vozila u toku, pricekajte';
            this.current_vehicle.type = this.selectedType;
            if (this.selectedLine === undefined) {
                this.current_vehicle.lineId = null;
                this.current_vehicle.lineName = '';
            } else {
                this.current_vehicle.lineId = this.selectedLine.id;
                this.current_vehicle.lineName = this.selectedLine.name;
            }
            this.vehicleService.updateVehicle(this.current_vehicle)
                .then((response) => {
                    this.vehicles = response;
                    this.loadingVehicle = false;
                    this.title_vehicle = 'Vozilo sacuvano, izaberite novo za uredjivanje informacija';
                }).catch((error) => {
                    this.loadingVehicle = false;
                    this.title_vehicle = 'Problem prilikom cuvanja podataka, pokusajte ponovo';
                });
        }

  deleteVehicle() {
      if ( this.current_vehicle.id === null) {
          this.showVehicle = false;
          this.title_vehicle = 'Izaberite vozilo za uredjivanje informacija';
          return;
      }
      this.showVehicle = false;
      this.loadingVehicle = true;
      this.title_vehicle = 'Brisanje vozila u toku, pricekajte';
      this.vehicleService.deleteVehicle(this.current_vehicle)
            .then((response) => {
                this.loadingVehicle = false;
                this.title_vehicle = 'Vozilo izbrisano, izaberite novu za prikaz informacija';
                this.vehicles = response;
            }).catch((error) => {
                this.loadingVehicle = false;
                this.title_vehicle = 'Problem prilikom brisanja vozila, osvjezite stranicu i pokusajte ponovo. \nNapomena: Vozila' +
                ' ne smije biti u upotrebi prilikom brisanja.';
            });
  }

}
