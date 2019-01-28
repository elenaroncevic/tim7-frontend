import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Stanica } from './model/Stanica';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class StationService {
    private stationUrl = 'http://localhost:8080/stanice';

    getStations() {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.get<Stanica[]>(this.stationUrl + '/sve', httpOptions).toPromise();
    }

    updateStation(station: any) {
        var token = localStorage.getItem('X-Auth-Token');
        let httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token' : token})
        };
        if ( station.id === null) {
            return this.http.post<Stanica[]>(this.stationUrl + '/dodaj', station, httpOptions).toPromise();
        } else {
            return this.http.put<Stanica[]>(this.stationUrl + '/mijenjaj', station, httpOptions).toPromise();
        }
    }

    deleteStation(station: Stanica) {
        var token = localStorage.getItem('X-Auth-Token');
        let httpOptions = {
          headers: new HttpHeaders({ 'X-Auth-Token' : token })
        };
        return this.http.delete<Stanica[]>(this.stationUrl + '/brisi/' + station.id, httpOptions).toPromise();
    }

    constructor(private http: HttpClient, protected localStorage: LocalStorage ) { }
}