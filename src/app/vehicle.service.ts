import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Vozilo } from './model/Vozilo';

@Injectable({
    providedIn: 'root'
})

export class VehicleService {
    private vehicleUrl = 'http://localhost:8080/vozila';

    getVehicles() {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.get<Vozilo[]>(this.vehicleUrl + '/sve', httpOptions).toPromise();
    }

    deleteVehicle(vehicle: Vozilo) {
        var token = localStorage.getItem('X-Auth-Token');
        let httpOptions = {
          headers: new HttpHeaders({ 'X-Auth-Token' : token })
        };
        return this.http.delete<Vozilo[]>(this.vehicleUrl + '/brisi/' + vehicle.id, httpOptions).toPromise();
    }

    updateVehicle(vehicle: any) {
        var token = localStorage.getItem('X-Auth-Token');
        let httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token' : token})
        };
        if ( vehicle.id === null) {
            return this.http.post<Vozilo[]>(this.vehicleUrl + '/dodaj', vehicle, httpOptions).toPromise();
        } else {
            return this.http.put<Vozilo[]>(this.vehicleUrl + '/mijenjaj', vehicle, httpOptions).toPromise();
        }
    }
    constructor(private http: HttpClient, protected localStorage: LocalStorage ) { }
}
