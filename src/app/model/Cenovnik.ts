import {StavkaCenovnika} from './stavkaCenovnika';

export class Cenovnik {
  datumObjavljivanja :  Date;
  datumIsteka : Date;
  id : number;
  stavkeCenovnika : StavkaCenovnika[];

  constructor() {
        this.datumObjavljivanja = new Date();
        this.datumIsteka = new Date();
        this.stavkeCenovnika = [];
    }
}
