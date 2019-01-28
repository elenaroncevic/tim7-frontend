import { Component, OnInit } from '@angular/core';
import { Stanica } from '../model/Stanica';
import { StationService } from '../station.service';

@Component({
  selector: 'app-admin-stanice',
  templateUrl: './admin-stanice.component.html',
  styleUrls: ['./admin-stanice.component.css']
})
export class AdminStaniceComponent implements OnInit {
    stations: Stanica[];
    currentStation: Stanica;
    showStation: boolean;
    savingStation: boolean;
    title: string;
    title_station: string;
    hasAccess: boolean;

  constructor(private stationService: StationService) { }

  ngOnInit() {
      this.hasAccess = false;
      this.showStation = false;
      this.savingStation = false;
      this.title = 'Stanice ucitavaju, pricekajte';
      this.title_station = 'Izaberite stanicu za izmjenu informacija';
      this.stationService.getStations()
      .then((response) => {
        this.stations = response;
        this.title = 'STANICA';
      }).catch((error) => {
        this.title = 'Problem prilikom ucitavanja stanica, osvjezite stranicu i pokusajte opet';
      });
  }

  openStationInfo(stanica: Stanica) {
    this.currentStation = JSON.parse(JSON.stringify(stanica));
    this.showStation = true;
  }

  saveChanges() {
      if (this.currentStation.name === '') {
          return;
      }
      this.savingStation = true;
      this.title_station = 'Cuvanje stanice u toku, pricekajte';
      this.showStation = false;
      this.stationService.updateStation(this.currentStation)
            .then((response) => {
                console.log(response);
                this.stations = response;
                this.savingStation = false;
                this.title_station = 'Stanica je sacuvana, izaberite drugu za izmjenu informacija';
            }).catch((error) => {
                this.title_station = 'Problem sa cuvanjem stanice, osvjezite stranicu i pokusajte opet';
            });
  }

  deleteStation() {
      this.savingStation = true;
      this.title_station = 'Brisanje stanice u toku, pricekajte';
      this.showStation = false;
      this.stationService.deleteStation(this.currentStation)
      .then((response) => {
        this.stations = response;
        this.savingStation = false;
        this.title_station = 'Stanica je izbrisana, izaberite drugu za izmjenu informacija';
      }).catch((error) => {
          this.savingStation = false;
        this.title_station = 'Problem prilikom brisanja stanice, osvjezite stranicu i pokusajte opet';
      });
  }

}
