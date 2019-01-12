import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenovnikComponent} from './cenovnik/cenovnik.component';
 
const routes: Routes = [
  { path: 'cenovnik', component: CenovnikComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
