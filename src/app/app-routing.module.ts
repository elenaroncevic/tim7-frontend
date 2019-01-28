import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenovnikComponent} from './cenovnik/cenovnik.component';
import { EditCenovnikComponent} from './edit-cenovnik/edit-cenovnik.component';
import { RegistracijaComponent} from './registracija/registracija.component';
import { PrijavaComponent} from './prijava/prijava.component';

import { ProfilKorisnikComponent} from './profil-korisnik/profil-korisnik.component';
import { ProfilAdminComponent} from './profil-admin/profil-admin.component';
import { ProfilVerifikatorComponent} from './profil-verifikator/profil-verifikator.component';
import { ProfilKondukterComponent} from './profil-kondukter/profil-kondukter.component';
import { FormCenovnikComponent} from './form-cenovnik/form-cenovnik.component';

import { KupovinaKarteComponent} from './kupovina-karte/kupovina-karte.component';
import { UredjivanjeProfilaComponent} from './uredjivanje-profila/uredjivanje-profila.component';
import { IzmenaLozinkeComponent} from './izmena-lozinke/izmena-lozinke.component';
import { MrezaLinijaComponent } from './mreza-linija/mreza-linija.component';
import { MapComponent } from './map/map.component';
import { AdminZoneComponent } from './admin-zone/admin-zone.component';
import { AdminStaniceComponent } from './admin-stanice/admin-stanice.component';
import { AdminLinijeComponent } from './admin-linije/admin-linije.component';
import { AdminVozilaComponent } from './admin-vozila/admin-vozila.component';
import { ProveraKarteComponent } from './provera-karte/provera-karte.component';
import { PotvrdaZahtevaComponent } from './potvrda-zahteva/potvrda-zahteva.component';
import { TrenutniRasporedComponent } from './trenutni-raspored/trenutni-raspored.component';

const routes: Routes = [
  { path: 'cenovnik', component: CenovnikComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'profilKorisnik', component: ProfilKorisnikComponent },
  { path: 'profilAdmin', component: ProfilAdminComponent },
  { path: 'profilVerifikator', component: ProfilVerifikatorComponent },
  { path: 'profilKondukter', component: ProfilKondukterComponent },
  { path: 'kupovinaKarte', component: KupovinaKarteComponent },
  { path: 'uredjivanjeProfila', component: UredjivanjeProfilaComponent },
  { path: 'izmenaLozinke', component: IzmenaLozinkeComponent },
  { path: 'editCenovnik', component: EditCenovnikComponent},

  { path: 'formCenovnik', component: FormCenovnikComponent},
  { path: 'mrezaLinija', component: MrezaLinijaComponent},
  { path: 'adminZone', component: AdminZoneComponent},
  { path: 'adminLinije', component: AdminLinijeComponent},
  { path: 'adminStanice', component: AdminStaniceComponent},
  { path: 'adminVozila', component: AdminVozilaComponent},
  { path: 'proveraKarte', component: ProveraKarteComponent},
  { path: 'potvrdaZahteva', component: PotvrdaZahtevaComponent},
  { path: 'trenutniRaspored', component: TrenutniRasporedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
