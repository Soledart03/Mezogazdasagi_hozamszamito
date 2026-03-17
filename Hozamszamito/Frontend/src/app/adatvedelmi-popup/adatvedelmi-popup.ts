import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adatvedelmi-popup',
  standalone: false,
  templateUrl: './adatvedelmi-popup.html',
  styleUrl: './adatvedelmi-popup.css'
})
export class AdatvedelmiPopup implements OnInit {
  visible = false;

  ngOnInit() {
    const elfogadva = localStorage.getItem('adatvedelmi_elfogadva');
    if (!elfogadva) {
      this.visible = true;
    }
  }

  elfogad() {
    localStorage.setItem('adatvedelmi_elfogadva', 'true');
    this.visible = false;
  }
}