import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
  menu: 'none'|'login'|'register'|'foldfelvisz'|'tervfelvisz'|'kiadas' = 'none';
  openMenu(type:'login'|'register'|'foldfelvisz'|'kiadas'){
    this.menu = type;
  }
  closeMenu(){
    this.menu = 'none';
  }
}
