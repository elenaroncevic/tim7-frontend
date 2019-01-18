import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenovnikComponent} from './cenovnik/cenovnik.component';
import { RegistracijaComponent} from './registracija/registracija.component';
import { PrijavaComponent} from './prijava/prijava.component';

import { ProfilKorisnikComponent} from './profil-korisnik/profil-korisnik.component';
import { ProfilAdminComponent} from './profil-admin/profil-admin.component';
import { ProfilVerifikatorComponent} from './profil-verifikator/profil-verifikator.component';
import { ProfilKondukterComponent} from './profil-kondukter/profil-kondukter.component';
const routes: Routes = [
  { path: 'cenovnik', component: CenovnikComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'profilKorisnik', component: ProfilKorisnikComponent },
  { path: 'profilAdmin', component: ProfilAdminComponent },
  { path: 'profilVerifikator', component: ProfilVerifikatorComponent },
  { path: 'profilKondukter', component: ProfilKondukterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
