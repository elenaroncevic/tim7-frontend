import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Linija, Zona } from './model/Linija';

@Injectable({
    providedIn: 'root'
})

export class LinijeService {
    private linijeUrl = 'http://localhost:8080/linije';

    updateLine(line: Linija) {
        var token = localStorage.getItem('X-Auth-Token');
        let httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token' : token})
        };
        if ( line.id === null) {
            return this.http.post<Linija[]>(this.linijeUrl + '/dodaj', line, httpOptions).toPromise();
        } else {
            return this.http.put<Linija[]>(this.linijeUrl + '/mijenjaj', line, httpOptions).toPromise();
        }
    }

    getLinije( zona) {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (zona == null || zona.id == null) {
            return this.http.get<Linija[]>(this.linijeUrl + '/sve', httpOptions).toPromise();
        } else {
            return this.http.get<Linija[]>(this.linijeUrl + '/sveJedneZone/' + zona.id, httpOptions).toPromise();
        }
    }

    deleteLine( id: number) {
        var token = localStorage.getItem('X-Auth-Token');
        const httpOptions = {
          headers: new HttpHeaders({ 'X-Auth-Token' : token })
        };
        return this.http.delete<Linija[]>(this.linijeUrl + '/brisi/' + id, httpOptions).toPromise();
    }

    constructor(private http: HttpClient, protected localStorage: LocalStorage ) { }
}
