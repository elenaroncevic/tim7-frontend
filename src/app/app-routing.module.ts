import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenovnikComponent} from './cenovnik/cenovnik.component';
import { RegistracijaComponent} from './registracija/registracija.component';
import { PrijavaComponent} from './prijava/prijava.component';
import { ProfilComponent} from './profil/profil.component';
const routes: Routes = [
  { path: 'cenovnik', component: CenovnikComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'profil', component: ProfilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
