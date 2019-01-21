import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CenovnikComponent } from './cenovnik/cenovnik.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';

import { ProfilKorisnikComponent } from './profil-korisnik/profil-korisnik.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { ProfilVerifikatorComponent } from './profil-verifikator/profil-verifikator.component';
import { ProfilKondukterComponent } from './profil-kondukter/profil-kondukter.component';
import { FormCenovnikComponent } from './form-cenovnik/form-cenovnik.component';

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
    FormCenovnikComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
