import {Component} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {PuzzlePastaAndWine} from "../models/puzzle-pasta-and-wine";

@Component({
  selector: 'app-puzzle-pasta-and-wine',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: '../templates/puzzle-pasta-and-wine.component.html',
  styleUrl: '../css/puzzle-pasta-and-wine.component.css'
})
export class PuzzlePastaAndWineComponent {
  public solution: any;
  private puzzle: any;
  clickedOnce: { [key: string]: boolean } = {};
  clickedTwice: { [key: string]: boolean } = {};
  annule: { [key: string]: boolean } = {};
  propagates: { [key: string]: boolean } = {};
  nb_propagates: { [key: string]: number } = {};
  womens = ['Women 1', 'Women 2', 'Women 3', 'Women 4', 'Women 5']
  shirts = ['blue', 'green', 'red', 'white', 'yellow'];
  names = ['Andrea', 'Holly', 'Julie', 'Leslie', 'Victoria'];
  surnames = ['Brown', 'Davis', 'Lopes', 'Miler', 'Wilson'];
  wines = ['Farfalle', 'Lasagne', 'Penne', 'Spaghetti', 'Ravioli'];
  pastas = ['Australian', 'Argentine', 'Chilean', 'French', 'Italian'];
  ages = ['30 years', '35 years', '40 years', '45 years', '50 years'];
  evidences = [
    'The woman wearing the White shirt is next to the woman who likes Lombardian wines.',
    'Ms Miller is somewhere between Ms Davis and Ms Brown, in that order.',
    'The youngest woman is at the third position.',
    'The 45-year-old woman is somewhere to the right of the woman wearing the Red shirt.',
    'The woman who likes Chilean wines also likes Farfalle.',
    'At the first position is the woman that likes Argentine wines.',
    'Andrea is exactly to the right of the 35-year-old woman.',
    'The woman wearing the Blue shirt is somewhere between Ms Davis and Holly, in that order.',
    'Victoria is next to Leslie.',
    'The woman wearing the Red shirt is somewhere to the left of the woman who likes Australian wines.',
    'Ms Wilson is next to the 30-year-old woman.',
    'Leslie is exactly to the left of the 30-year-old woman.',
    'Holly is somewhere to the right of the woman wearing the Red shirt.',
    'Ms Brown is exactly to the left of Julie.',
    'The youngest woman likes Penne.',
    'Ms Wilson is wearing the White shirt.',
    'The woman who likes Lasagne is somewhere between the woman who likes Italian wines and the woman who likes Spaghetti, in that order.',
    'At the second position is the woman wearing the Blue shirt.',
    'The 40-year-old woman likes Lasagne.',
    'Ms Lopes is at the fifth position.',
    'The woman that likes Australian wines is somewhere between Victoria and the woman who likes wines from Bordeaux, in that order.',
    'The woman wearing the Yellow shirt is exactly to the left of the 35-year-old woman.'
  ]

  constructor() {
    this.puzzle = new PuzzlePastaAndWine();
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
    if (this.shirts.includes(name)) {
      this.shirts.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    } else if (this.names.includes(name)) {
      this.names.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    } else if (this.surnames.includes(name)) {
      this.surnames.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    } else if (this.pastas.includes(name)) {
      this.pastas.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    } else if (this.wines.includes(name)) {
      this.wines.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    } else if (this.ages.includes(name)) {
      this.ages.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    } else if (this.womens.includes(name)) {
      this.womens.forEach((m) => {
        if (m != name) {
          var1.push(m)
        }
      });
    }

    if (this.shirts.includes(pc)) {
      this.shirts.forEach((m) => {
        if (m != pc) {
          var2.push(m)
        }
      });
    } else if (this.names.includes(pc)) {
      this.names.forEach((m) => {
        if (m != pc) {
          var2.push(m)
        }
      });
    } else if (this.surnames.includes(pc)) {
      this.surnames.forEach((m) => {
        if (m != pc) {
          var2.push(m)
        }
      });
    } else if (this.pastas.includes(pc)) {
      this.pastas.forEach((m) => {
        if (m != pc) {
          var2.push(m)
        }
      });
    } else if (this.wines.includes(pc)) {
      this.wines.forEach((m) => {
        if (m != pc) {
          var2.push(m)
        }
      });
    } else if (this.ages.includes(pc)) {
      this.ages.forEach((m) => {
        if (m != pc) {
          var2.push(m)
        }
      });
    } else if (this.womens.includes(pc)) {
      this.womens.forEach((m) => {
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
      console.log(JSON.stringify(this.solution["__zone_symbol__value"].solution.output.json));
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
    if (element.classList.contains('lineThrough')) {
      element.classList.remove('lineThrough')
    } else {
      element.classList.add('lineThrough')
    }
  }

}
