import { Component, OnInit } from '@angular/core';
import {StavkaCenovnika} from '../model/stavkaCenovnika';
import{CenovnikService} from '../cenovnik.service';
import {Cenovnik} from '../model/Cenovnik';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.css']
})
export class CenovnikComponent implements OnInit {

  cenovnik : Cenovnik;
  newCenovnik : Cenovnik;
  loading = true;
  token : string ;

  constructor(private cenovnikService : CenovnikService,
              protected localStorage: LocalStorage,
              private modalService: NgbModal) { }

  ngOnInit() {
    //until we finish login/registration
    var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhIiwiY3JlYXRlZCI6MTU0NzgxOTAxMzM5NywiZXhwIjoxNTQ3ODM3MDEzfQ.tz4Je4rNm4pyP6qDH4QU3hEk-z8uxlzgQLmVjxxYlYp9jStJCYZboy9KRY1gDo2LStNg24ScpylKEaX2zKjZow";
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

  openAddModal(content){
      this.modalService.open(content, {ariaLabelledBy: 'Dodavanje cenovnika'}).result.then((result) => {
      
    }, (reason) => {
     
    });
  }

  addCenovnik(){
    this.loading = true;
    this.cenovnikService.addCenovnik(this.cenovnik, this.token)
    .then((response) => {
      this.cenovnik = response;
      console.log(response);
      this.loading = false;
    }).catch((error) => {
      console.log(error)
    });
  }

}
