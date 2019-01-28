import { Stanica } from './Stanica';
import { Vozilo } from './Vozilo';

export class Linija {
   name: string;
   public id: number;
   zones: Zona[];
   stations: Stanica[];
   vehicles: Vozilo[];

  constructor() {  }
}

export class Zona {
   name: string;
   id: number;

  constructor() {}
}


