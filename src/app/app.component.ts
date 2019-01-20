import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { PrijavljenKorisnik } from './model/PrijavljenKorisnik';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tim7-frontend';
  
  constructor(private router: Router) { }

  get user(): any{
     return JSON.parse(localStorage.getItem('ulogovan')) as PrijavljenKorisnik;
  }

  odjava(){
    localStorage.removeItem('X-Auth-Token');
    localStorage.removeItem('ulogovan');
    this.router.navigate(['/'])


  }
}
