import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {PuzzleFactoryService} from "../models/factories/puzzle-factory-service";
import * as MiniZinc from "minizinc";
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: '../templates/app.component.html',
  styleUrl: '../css/app.component.css',
})

export class AppComponent {
  title = 'Peuzeulz !';
  puzzle: any;

  constructor(private puzzleFactory: PuzzleFactoryService) {
    MiniZinc.init({
      workerURL: 'http://localhost:4200/assets/minizinc-worker.js',
      wasmURL: 'http://localhost:4200/assets/minizinc.wasm',
      dataURL: 'http://localhost:4200/assets/minizinc.data'
    }).then(() => {
      console.log('Ready');
    });

    this.getPuzzle('computer.mzn');
  }

  getPuzzle(name: string) {
    this.puzzle = this.puzzleFactory.getPuzzleInstance(name)
  }

}
