import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SelectDropDownModule } from 'ngx-select-dropdown';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CenovnikComponent } from './cenovnik/cenovnik.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';

import { ProfilKorisnikComponent } from './profil-korisnik/profil-korisnik.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { ProfilVerifikatorComponent } from './profil-verifikator/profil-verifikator.component';
import { ProfilKondukterComponent } from './profil-kondukter/profil-kondukter.component';
import { KupovinaKarteComponent } from './kupovina-karte/kupovina-karte.component';
import { UredjivanjeProfilaComponent } from './uredjivanje-profila/uredjivanje-profila.component';
import { FormCenovnikComponent } from './form-cenovnik/form-cenovnik.component';
import { IzmenaLozinkeComponent } from './izmena-lozinke/izmena-lozinke.component';
import { MrezaLinijaComponent } from './mreza-linija/mreza-linija.component';
import { MapComponent } from './map/map.component';
import { AdminZoneComponent } from './admin-zone/admin-zone.component';
import { AdminStaniceComponent } from './admin-stanice/admin-stanice.component';
import { AdminLinijeComponent } from './admin-linije/admin-linije.component';
import { AdminVozilaComponent } from './admin-vozila/admin-vozila.component';
import { ProveraKarteComponent } from './provera-karte/provera-karte.component';
import { PotvrdaZahtevaComponent } from './potvrda-zahteva/potvrda-zahteva.component';
import { EditCenovnikComponent } from './edit-cenovnik/edit-cenovnik.component';


@NgModule({
  declarations: [
    AppComponent,
    CenovnikComponent,
    RegistracijaComponent,
    PrijavaComponent,
    ProfilKorisnikComponent,
    ProfilAdminComponent,
    ProfilVerifikatorComponent,
    ProfilKondukterComponent,
    KupovinaKarteComponent,
    UredjivanjeProfilaComponent,
    IzmenaLozinkeComponent,
    MrezaLinijaComponent,
    FormCenovnikComponent,
    MapComponent,
    AdminZoneComponent,
    AdminStaniceComponent,
    AdminLinijeComponent,
    AdminVozilaComponent,
    ProveraKarteComponent,
    PotvrdaZahtevaComponent,
    EditCenovnikComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    SelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
