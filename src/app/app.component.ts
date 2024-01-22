import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as MiniZinc from 'minizinc';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'opti-appliquee';
  constructor() {
    MiniZinc.init({
      // If omitted, searches for minizinc-worker.js next to the minizinc library script
      workerURL: 'http://localhost:4200/assets/minizinc-worker.js',
      // If these are omitted, searches next to the worker script
      wasmURL: 'http://localhost:4200/assets/minizinc.wasm',
      dataURL: 'http://localhost:4200/assets/minizinc.data'
    }).then(() => {
      console.log('Ready');
    });
    // ('node_modules/minizinc/dist/minizinc-worker.js');

    const model = new MiniZinc.Model();
    model.addFile('carreMLagique.mzn', '');
    const solve = model.solve({
      options: {
        solver: 'gecode',
        // 'all-solutions': true,
        'statistics': true
      }
    });
    solve.on('solution', solution => console.log(solution.output.json)
    );
    solve.then((result: { status: any; }) => {
      console.log(result);
    });
  }

}

