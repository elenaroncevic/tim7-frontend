export class Linija {
   name: string;
   public id: number;
   zones : Zona[];
   stations: string[];

  constructor(){
  }
}

export class Zona {
   name: string;
   id: number;

  constructor(){    
  }
}

export class SveZaStavku{
  linije: Linija[];
  tipoviKarata: string[];
  vrstePrevoza: string[];
  statusiKorisnika: string[];
  zones: Zona[];

  constructor(){
  }
}


