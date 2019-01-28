export class StavkaCenovnika {
  cena:number;
  tipKarte: string;
  vrstaPrevoza: string;
  nazivZone: string;
  nazivLinije: string;
  id: number;

  constructor(stavka)
  {
    this.cena = stavka.cena;
    this.tipKarte = stavka.tipKarte;
    this.vrstaPrevoza =  stavka.vrstaPrevoza;
    this.nazivZone = stavka.nazivZone && stavka.nazivZone.name || null ;
    this.nazivLinije =  stavka.nazivLinije && stavka.nazivLinije.name || null ;
    this.id =  stavka.id || null;
  }

 
}


