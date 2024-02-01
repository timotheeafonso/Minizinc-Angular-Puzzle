import {Component} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {PuzzleMovies} from "../models/puzzle-movies";

@Component({
  selector: 'app-puzzle-computer',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: '../templates/puzzle-movies.component.html',
  styleUrl: '../css/puzzle-movies.component.css'
})
export class PuzzleMoviesComponent {
  public solution: any;
  private puzzle: any;
  clickedOnce: { [key: string]: boolean } = {};
  clickedTwice: { [key: string]: boolean } = {};
  annule: { [key: string]: boolean } = {};
  propagates: { [key: string]: boolean } = {};
  nb_propagates: { [key: string]: number } = {};
  films = ['88 minutes', 'Donnie Brasco', 'Scarecrow', 'Scarface', 'The Recruit'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  times = ['7:35 pm', '7:40 pm', '8:20 pm', '8:30 pm', '8:45'];
  people = ['Jessica', 'Laurie', 'Mark', 'Mary', 'Sally'];
  evidences= [
    'Of the 20-hundreds releases, neither of which was Jessica\'s choice, one opened the week and one closed the week.',
    'The latest of the 19-hundreds releases was shown at 30 minutes past the hour.',
    'The releases shown before 8:00 pm were on consecutive days, as were the releases shown after 8:00 pm.',
    'One of the men and one of the women had a showing before 8:00 pm, but neither was mid-week.',
    'Mark, whose choice was Scarecrow, had a showing at a time of one hour and five minutes after that of Scarface.',
    'Neither Miss Farmer nor Miss Peters had a showing on an even-numbered day',
    '88 Minutes showed at a time both 40 minutes to the hour and 40 minutes after the Thursday showing.'
  ]

  constructor() {
    this.puzzle = new PuzzleMovies();
    this.solution = this.puzzle.solveModel();
  }

  cellClicked(name: string, pc: string) {
    if (this.propagates[name + pc] == false || this.propagates[name + pc] == undefined) {
      if (this.clickedOnce[name + pc] == undefined && this.clickedTwice[name + pc] == undefined && this.annule[name + pc] == undefined) {
        this.cellClickedOnce(name, pc);
      } else if (this.clickedOnce[name + pc]) {
        this.cellClickedTwice(name, pc);
        this.propage(name, pc);
      } else if (this.clickedTwice[name + pc]) {
        this.cellAnnule(name, pc);
        this.propage(name, pc);
      } else if (this.annule[name + pc]) {
        this.cellClickedOnce(name, pc);
      }
    }
  }

  propage(name: string, pc: string) {
    var var1: string[] = [];
    var var2: string[] = [];
    if (this.people.includes(name)) {
      this.people.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    } else if (this.films.includes(name)) {
      this.films.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    } else if (this.days.includes(name)) {
      this.days.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    } else if (this.times.includes(name)) {
      this.times.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    }

    if (this.people.includes(pc)) {
      this.people.forEach((m) => {
        if (m != pc) {
          var2.push(m)
        }
      });
    } else if (this.films.includes(pc)) {
      this.films.forEach((m) => {
        if (m != pc) {
          var2.push(m)
        }
      });
    } else if (this.days.includes(pc)) {
      this.days.forEach((m) => {
        if (m != pc) {
          var2.push(m)
        }
      });
    } else if (this.times.includes(pc)) {
      this.times.forEach((m) => {
        if (m != pc) {
          var2.push(m)
        }
      });
    }

    var1.forEach((v1: string): void => {
      if (this.clickedTwice[name + pc]) {
        //this.cellClickedOnce(v1, pc);
        this.cellPropagate(v1, pc)
      } else if (this.annule[name + pc]) {
        //if(this.clickedOnce[v1+pc]) {
        this.cellReversePropagate(v1, pc)
        //this.cellAnnule(v1, pc);
        //}
      }
    })
    var2.forEach((v2: string): void => {
      if (this.clickedTwice[name + pc]) {
        //this.cellClickedOnce(name, v2);
        this.cellPropagate(name, v2);
      } else if (this.annule[name + pc]) {
        //if(this.clickedOnce[name+v2]) {
        this.cellReversePropagate(name, v2);
        //this.cellAnnule(name, v2);
        //}
      }
    })

  }

  cellClickedOnce(name: string, pc: string) {
    this.clickedOnce[name + pc] = true;
    this.clickedTwice[name + pc] = false;
    this.annule[name + pc] = false;
    if (this.solution["__zone_symbol__state"]) {
      // console.log(this.solution["__zone_symbol__value"].solution.output.json);
      console.log(this.solution["__zone_symbol__value"].solution.output.default);
    } else {
      console.log("solving ...");
    }
  }

  cellClickedTwice(name: string, pc: string) {
    this.clickedOnce[name + pc] = false;
    this.clickedTwice[name + pc] = true;
    this.annule[name + pc] = false;
  }

  cellAnnule(name: string, pc: string) {
    this.clickedOnce[name + pc] = false;
    this.clickedTwice[name + pc] = false;
    this.annule[name + pc] = true;
  }

  cellPropagate(name: string, pc: string) {

    if ((this.clickedTwice[name + pc] == false || this.clickedTwice[name + pc] == undefined) && (this.clickedOnce[name + pc] == false || this.clickedOnce[name + pc] == undefined)) {
      this.propagates[name + pc] = true;
      if (this.nb_propagates[name + pc] == undefined)
        this.nb_propagates[name + pc] = 1;
      else this.nb_propagates[name + pc] += 1;
      console.log(this.nb_propagates[name + pc]);
    }
  }

  cellReversePropagate(name: string, pc: string) {
    if ((this.clickedTwice[name + pc] == false || this.clickedTwice[name + pc] == undefined) && (this.clickedOnce[name + pc] == false || this.clickedOnce[name + pc] == undefined)) {
      if (this.nb_propagates[name + pc] == 1) {
        this.propagates[name + pc] = false;
        this.nb_propagates[name + pc] -= 1;
      } else if (this.nb_propagates[name + pc] > 1) {
        this.nb_propagates[name + pc] -= 1;
      }
    }
  }

  putLineThrough(element: HTMLElement) {
    if(element.classList.contains('lineThrough')) {
      element.classList.remove('lineThrough')
    } else {
      element.classList.add('lineThrough')
    }
  }

  showSuccessModal() {

  }

}

