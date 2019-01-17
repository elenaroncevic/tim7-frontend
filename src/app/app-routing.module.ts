import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenovnikComponent} from './cenovnik/cenovnik.component';
import { RegistracijaComponent} from './registracija/registracija.component';
 
const routes: Routes = [
  { path: 'cenovnik', component: CenovnikComponent },
  { path: 'registracija', component: RegistracijaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
