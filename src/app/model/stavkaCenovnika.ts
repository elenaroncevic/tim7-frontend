export class StavkaCenovnika {
   cena:number;
   tipKarte: string;
   vrstaPrevoza: string;
   nazivZone: string;
   nazivLinije: string;
   id: number;

  constructor(stavka : StavkaCenovnika){
  this.cena = stavka.cena;
  this.tipKarte = stavka.tipKarte;
  this.vrstaPrevoza = stavka.vrstaPrevoza;
  this.nazivZone = stavka.nazivZone;
  this.nazivLinije = stavka.nazivLinije;
  this.id = stavka.id;
}
}


