import { Component, OnInit } from '@angular/core';
import { ZahtevKarteService } from '../zahtev-karte.service';
import { OdobrenjeKarte } from '../model/OdobrenjeKarte';
import { Odgovor } from '../model/Odgovor';

@Component({
  selector: 'app-potvrda-zahteva',
  templateUrl: './potvrda-zahteva.component.html',
  styleUrls: ['./potvrda-zahteva.component.css']
})
export class PotvrdaZahtevaComponent implements OnInit {
  
  loading :boolean;
  listaZahteva:OdobrenjeKarte[];
  postoje:boolean;
  odgovor:Odgovor;
  
  constructor(private zahtevKarteService:ZahtevKarteService) { }

  ngOnInit() {
    this.postoje=true;
    this.loading=true;
    this.odgovor=null;
    this.dobaviNeodobreneKarte();
  }



  dobaviNeodobreneKarte(){
    this.loading=true;
    this.zahtevKarteService.dobaviNeodobrene()
    .then((response)=>{
      this.listaZahteva = response;
      this.loading = false;
      this.postoje=true;
     }).catch((error)=>{
        this.postoje=false;
        console.log(error);
     });
  }


  odobriIliPonisti(idKarte:number, status:string){
    this.zahtevKarteService.odobriKartu(idKarte,status)
    .then((response)=>{
      this.odgovor=response;
      this.dobaviNeodobreneKarte();
      alert(this.odgovor.odgovor);
     }).catch((error)=>{
        console.log(error);
     });
  }

  odobriKartu(idKarte:number){
    this.odobriIliPonisti(idKarte,"ODOBRENA");
  }

  ponistiKartu(idKarte:number){
    this.odobriIliPonisti(idKarte, "PONISTENA");
  }

}
