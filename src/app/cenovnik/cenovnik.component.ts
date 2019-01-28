import { Component, OnInit , Input} from '@angular/core';
import {StavkaCenovnika} from '../model/stavkaCenovnika';
import{CenovnikService} from '../cenovnik.service';
import {Cenovnik} from '../model/Cenovnik';




@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.css']
})
export class CenovnikComponent implements OnInit {

  loading = true;

  @Input('cenovnik') cenovnik: Cenovnik;




  constructor(private cenovnikService : CenovnikService) {
    }

  ngOnInit() {
    if(!this.cenovnik){
      this.getCenovnik();
    }
    else{
      this.loading = false;
    }
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

  

}
