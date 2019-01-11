import { Component, OnInit } from '@angular/core';
import {StavkaCenovnika} from '../model/stavkaCenovnika';
import{STAVKE} from './mock';

@Component({
  selector: 'app-stavka-cenovnika',
  templateUrl: './stavka-cenovnika.component.html',
  styleUrls: ['./stavka-cenovnika.component.css']
})
export class StavkaCenovnikaComponent implements OnInit {

  stavkeCenovnika = STAVKE;
  datumObjavljivanja = new Date();
  datumIsteka = new Date();
  id = 1;
  constructor() { }

  ngOnInit() {
  }

  sort(prop: string) {
    const sorted = this.stavkeCenovnika.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    if (prop.charAt(0) === '-') { sorted.reverse(); }
    return sorted;
}

}
