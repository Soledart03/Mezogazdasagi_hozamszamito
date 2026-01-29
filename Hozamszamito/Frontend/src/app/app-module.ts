import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { Regcomp } from './regcomp/regcomp';
import { FormsModule } from '@angular/forms';
import { Fooldal } from './fooldal/fooldal';
import { Navbar } from './navbar/navbar';
import { Loginform } from './loginform/loginform';
import { Foldek } from './foldek/foldek';
import { Foldfelform } from './foldfelform/foldfelform';
import { Terv } from './terv/terv';
import { Tervform } from './tervform/tervform';
import { Footer } from './footer/footer';
import { Sugo } from './sugo/sugo';
import { Kiadasok } from './kiadasok/kiadasok';
import { Kiadasfelform } from './kiadfelform/kiadfelform';

@NgModule({
  declarations: [
    App,
    Regcomp,
    Fooldal,
    Navbar,
    Loginform,
    Foldek,
    Foldfelform,
    Terv,
    Tervform,
    Footer,
    Sugo,
    Kiadasok,
    Kiadasfelform,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    Loginform,
    Navbar,
    
  ],
  bootstrap: [App]
})
export class AppModule { }
