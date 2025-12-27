import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Regcomp } from './regcomp/regcomp';
import { Fooldal } from './fooldal/fooldal';
import { Loginform } from './loginform/loginform';
import { Foldek } from './foldek/foldek';
const routes: Routes = [
  {path:'register', component:Regcomp },
  {path:'login',component:Loginform},
  {path:'',component:Fooldal},
  {path:'fold',component:Foldek}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }