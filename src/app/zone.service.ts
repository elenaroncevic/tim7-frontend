import { Injectable } from '@angular/core';
import { Zona, Linija } from './model/Linija';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
    providedIn: 'root'
})

export class ZoneService {
    private zoneUrl = 'http://localhost:8080/zone';

    getZone() {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.get<Zona[]>(this.zoneUrl + '/sve', httpOptions).toPromise();
    }

    deleteZone(zone: Zona) {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        var token = localStorage.getItem('X-Auth-Token');
        httpOptions.headers = httpOptions.headers.append( 'X-Auth-Token' , token);
        return this.http.delete<void>(this.zoneUrl + '/brisi/' + zone.id, httpOptions).toPromise();
    }

    updateZone(zone: Zona) {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        var token = localStorage.getItem('X-Auth-Token');
        httpOptions.headers = httpOptions.headers.append( 'X-Auth-Token' , token);
        return this.http.put<void>(this.zoneUrl + '/mijenjaj', zone, httpOptions).toPromise();
    }

    removeLineFromZone(zone: Zona, id: number) {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        var token = localStorage.getItem('X-Auth-Token');
        httpOptions.headers = httpOptions.headers.append( 'X-Auth-Token' , token);
        return this.http.put<Linija[]>(this.zoneUrl + '/ukloniLiniju/' + id, zone, httpOptions).toPromise();
    }

    constructor(private http: HttpClient, protected localStorage: LocalStorage ) { }
}
