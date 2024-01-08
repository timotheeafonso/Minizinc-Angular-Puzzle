import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// @ts-ignore
import { Model } from 'https://cdn.jsdelivr.net/npm/minizinc/dist/minizinc.mjs';




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
    const model = new Model();
    model.addFile('carreMLagique.mzn', 'var 1..4: x;');
    const solve = model.solve({
      options: {
        solver: 'gecode',
        'all-solutions': true
      }
    });
    solve.on('solution',  (solution: { output: { json: any; }; })  => {
      console.log(solution.output.json);
    });
    solve.then((result: { status: any; }) => {
      console.log(result.status);
    });
  }

}

