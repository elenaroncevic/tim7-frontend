import { Component, OnInit } from '@angular/core';
import {StavkaCenovnika} from '../model/stavkaCenovnika';
import{CenovnikService} from '../cenovnik.service';
import {Cenovnik} from '../model/Cenovnik';
import { LocalStorage } from '@ngx-pwa/local-storage';


@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.css']
})
export class CenovnikComponent implements OnInit {

  cenovnik : Cenovnik;
  loading = true;
  token : string ;

  constructor(private cenovnikService : CenovnikService, protected localStorage: LocalStorage) { }

  ngOnInit() {
    //until we finish login/registration
    var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhIiwiY3JlYXRlZCI6MTU0NzY4NjY5NDcyNCwiZXhwIjoxNTQ3NzA0Njk0fQ.4-YCcYZD81cK4ArrSXxcIkYJdabAPN2Rfu8mjGLLu9S5qaTKdWzNo_En_6ZCLW5Ra4pg8jvfHu6d7oyaTpsm_A";
    this.localStorage.setItemSubscribe('token', token);
    this.getCenovnik();
    this.localStorage.getItem<string>('token').subscribe((token : string) => {
      this.token = token;
    });

  }

  sort(prop: string) {    
    const sorted = this.cenovnik.stavkeCenovnika.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    if (prop.charAt(0) === '-') { sorted.reverse(); }
    return sorted;
  };
  
  getCenovnik(){
  this.loading = true;
    this.cenovnikService.getCenovnik()
    .then((response)=>{
      this.cenovnik = response;
      this.loading = false;
     }).catch((error)=>{
        console.log(error);
     });
  }

  addCenovnik(){
    this.cenovnikService.addCenovnik()
  }

  editCenovnik(){
    this.loading = true;
    this.cenovnikService.editCenovnik(this.cenovnik, this.token)
    .then((response) => {
      this.cenovnik = response;
      console.log(response);
      this.loading = false;
    }).catch((error) => {
      console.log(error)
    });
  }

}
