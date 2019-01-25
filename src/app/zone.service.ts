import { Injectable } from '@angular/core';
import { Zona, Linija } from './model/Linija';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { UpdatedZona } from './model/UpdatedZona';

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
        var token = localStorage.getItem('X-Auth-Token');
        let httpOptions = {
          headers: new HttpHeaders({ 'X-Auth-Token' : token })
        };
        return this.http.delete<Zona[]>(this.zoneUrl + '/brisi/' + zone.id, httpOptions).toPromise();
    }

    updateZone(zone: any) {
        var token = localStorage.getItem('X-Auth-Token');
        let httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token' : token})
        };
        if ( zone.id === null) {
            return this.http.post<Zona[]>(this.zoneUrl + '/dodaj', zone, httpOptions).toPromise();
        } else {
            return this.http.put<Zona[]>(this.zoneUrl + '/mijenjaj', zone, httpOptions).toPromise();
        }
    }

    constructor(private http: HttpClient, protected localStorage: LocalStorage ) { }
}