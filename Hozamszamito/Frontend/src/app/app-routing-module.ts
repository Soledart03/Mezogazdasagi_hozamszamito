import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Regcomp } from './regcomp/regcomp';
import { Fooldal } from './fooldal/fooldal';

const routes: Routes = [
  {path:'register', component:Regcomp },
  {path:'',component:Fooldal}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
