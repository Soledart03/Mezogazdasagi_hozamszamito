import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Regcomp } from './regcomp/regcomp';
import { Fooldal } from './fooldal/fooldal';
import { Loginform } from './loginform/loginform';
import { Foldek } from './foldek/foldek';
import { Foldfelform } from './foldfelform/foldfelform';
import { Terv } from './terv/terv';
import{ Sugo } from './sugo/sugo';
const routes: Routes = [
  {path:'register', component:Regcomp },
  {path:'login',component:Loginform},
  {path:'',component:Fooldal},
  {path:'foldfelvisz',component:Foldfelform},
  {path:'fold',component:Foldek},
  {path:'terv',component:Terv},
  {path:'sugo',component:Sugo}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }