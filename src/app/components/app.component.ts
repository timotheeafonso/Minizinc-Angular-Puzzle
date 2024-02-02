import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import * as MiniZinc from "minizinc";
import {RouterModule} from '@angular/router';
import {ModalSuccessComponent} from "./modal-success.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ModalSuccessComponent],
  templateUrl: '../templates/app.component.html',
  styleUrl: '../css/app.component.css',
})

export class AppComponent {
  title = 'Peuzeulz !';
  puzzle: any;

  constructor() {
    MiniZinc.init({
      workerURL: 'http://localhost:4200/assets/minizinc-worker.js',
      wasmURL: 'http://localhost:4200/assets/minizinc.wasm',
      dataURL: 'http://localhost:4200/assets/minizinc.data'
    }).then(() => {
      console.log('Ready');
    });
  }

}
