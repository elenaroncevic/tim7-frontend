import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Linija, Zona } from './model/Linija';

@Injectable({
    providedIn: 'root'
})
export class MrezaLinijaService {
    private linijeUrl = 'http://localhost:8080/linije';
    private zoneUrl = 'http://localhost:8080/zone';
    prikaziMreze = false;

    getLinije( zona) {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (zona.id == null) {
            return this.http.get<Linija[]>(this.linijeUrl + '/sve', httpOptions).toPromise();
        } else {
            return this.http.get<Linija[]>(this.linijeUrl + '/sveJedneZone/' + zona.id, httpOptions).toPromise();
        }
    }

    getZone() {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.get<Zona[]>(this.zoneUrl + '/sve', httpOptions).toPromise();
    }

    constructor(private http: HttpClient, protected localStorage: LocalStorage ) { }
}
