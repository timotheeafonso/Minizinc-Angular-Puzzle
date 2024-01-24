import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import * as MiniZinc from 'minizinc';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'Peuzeulz !';
  model: MiniZinc.Model = new MiniZinc.Model();
  modelFileContent: any;

  constructor() {
    MiniZinc.init({
      workerURL: 'http://localhost:4200/assets/minizinc-worker.js',
      wasmURL: 'http://localhost:4200/assets/minizinc.wasm',
      dataURL: 'http://localhost:4200/assets/minizinc.data'
    }).then(() => {
      console.log('Ready');
    });

    fetch("http://localhost:4200/assets/computer.mzn").then(
      res => res.text()
    ).then(
      data => {
        // console.log(data)
        this.modelFileContent = data
      }
    );
  }

  initModel() {
    // console.log(this.modelFileContent)
    this.model.addFile("computer.mzn", this.modelFileContent);
  }

  solveModel() {
    const solve = this.model.solve({
      options: {
        solver: 'gecode',
        'all-solutions': true,
      }
    });
    solve.then(result => {
      console.log(JSON.stringify(result.solution));
    });
  }
}
