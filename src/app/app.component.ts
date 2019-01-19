import { Component } from '@angular/core';
import { Router } from "@angular/router"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tim7-frontend';
  
  constructor(private router: Router) { }

  get user(): any{
  return localStorage.getItem('X-Auth-Token');
  }

  odjava(){
    localStorage.removeItem('X-Auth-Token');
    this.router.navigate(['/'])
  }
}
