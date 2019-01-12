import {StavkaCenovnika} from './stavkaCenovnika';

export class Cenovnik {
  datumObjavljivanja :  Date;
  datumIsteka : Date;
  id : number;
  stavkeCenovnika : StavkaCenovnika[];
}
