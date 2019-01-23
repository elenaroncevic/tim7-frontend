import { Stanica } from './Stanica';

export class Linija {
   name: string;
   public id: number;
   zones: Zona[];
   stations: Stanica[];

  constructor() {  }
}

export class Zona {
   name: string;
   id: number;

  constructor() {}
}


