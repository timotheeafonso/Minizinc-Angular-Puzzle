import {Component, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PuzzlePastaAndWine} from "../models/puzzle-pasta-and-wine";
import {ModalSuccessComponent} from "./modal-success.component";

@Component({
  selector: 'app-puzzle-pasta-and-wine',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    ModalSuccessComponent,
    NgIf
  ],
  templateUrl: '../templates/puzzle-pasta-and-wine.component.html',
  styleUrl: '../css/puzzle-pasta-and-wine.component.css'
})
export class PuzzlePastaAndWineComponent {
  public solution: any;
  private puzzle: any;
  start: boolean = false;
  clickedOnce: { [key: string]: boolean } = {};
  clickedTwice: { [key: string]: boolean } = {};
  annule: { [key: string]: boolean } = {};
  propagates: { [key: string]: boolean } = {};
  nb_propagates: { [key: string]: number } = {};
  women = ['Women 1', 'Women 2', 'Women 3', 'Women 4', 'Women 5']
  shirts = ['Blue', 'Green', 'Red', 'White', 'Yellow'];
  names = ['Andrea', 'Holly', 'Julie', 'Leslie', 'Victoria'];
  surnames = ['Brown', 'Davis', 'Lopes', 'Miller', 'Wilson'];
  pastas = ['Farfalle', 'Lasagne', 'Penne', 'Spaghetti', 'Ravioli'];
  wines = ['Australian', 'Argentine', 'Chilean', 'French', 'Italian'];
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

  @ViewChild(ModalSuccessComponent) modalSuccess: any;
  showModalSuccess = false;
  showModalNotSucess = false;
  current: { women: string, shirt: string, name: string, surname: string, pasta: string, wine: string, age: string }[] = [
    {women: 'Women 1', shirt: '', name: '', surname: '', pasta: '', wine: '', age: ''},
    {women: 'Women 2', shirt: '', name: '', surname: '', pasta: '', wine: '', age: ''},
    {women: 'Women 3', shirt: '', name: '', surname: '', pasta: '', wine: '', age: ''},
    {women: 'Women 4', shirt: '', name: '', surname: '', pasta: '', wine: '', age: ''},
    {women: 'Women 5', shirt: '', name: '', surname: '', pasta: '', wine: '', age: ''}
  ];

  objectif: { women: string, shirt: string, name: string, surname: string, pasta: string, wine: string, age: string }[] = [
    {women: 'Women 1', shirt: '', name: '', surname: '', pasta: '', wine: '', age: ''},
    {women: 'Women 2', shirt: '', name: '', surname: '', pasta: '', wine: '', age: ''},
    {women: 'Women 3', shirt: '', name: '', surname: '', pasta: '', wine: '', age: ''},
    {women: 'Women 4', shirt: '', name: '', surname: '', pasta: '', wine: '', age: ''},
    {women: 'Women 5', shirt: '', name: '', surname: '', pasta: '', wine: '', age: ''}
  ];

  constructor() {
    this.puzzle = new PuzzlePastaAndWine();
    this.solution = this.puzzle.solveModel();

    this.solution.then(() => {
      if (this.solution["__zone_symbol__value"].status == "ALL_SOLUTIONS") {
        var strSol = this.solution["__zone_symbol__value"].solution.output.default.split("\n");
        strSol.forEach((women: string, index2: number) => {
          var affectation = women.split(":");
          affectation.forEach((val: any, index: number) => {
            if (val != '') {
              if (index == 1) {
                this.objectif[index2].surname = val;
              } else if (index == 2) {
                this.objectif[index2].name = val;
              } else if (index == 3) {
                this.objectif[index2].shirt = val;
              } else if (index == 4) {
                this.objectif[index2].pasta = val;
              } else if (index == 5) {
                this.objectif[index2].wine = val;
              } else if (index == 6) {
                val += ' years'
                this.objectif[index2].age = val;
              }
            }
          })
        })
      }
      this.start = true;
      console.log(this.objectif);
    })
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
    } else if (this.women.includes(name)) {
      this.women.forEach((m) => {
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
    } else if (this.women.includes(pc)) {
      this.women.forEach((m) => {
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
  }

  cellClickedTwice(name: string, pc: string) {
    this.clickedOnce[name + pc] = false;
    this.clickedTwice[name + pc] = true;
    this.annule[name + pc] = false;

    this.current.forEach((c) => {
      if (c.women == name) {
        if (this.shirts.some((shirt) => shirt == pc)) {
          c.shirt = pc;
        } else if (this.names.some((n) => n == pc)) {
          c.name = pc;
        } else if (this.surnames.some((sn) => sn == pc)) {
          c.surname = pc;
        } else if (this.pastas.some((p) => p == pc)) {
          c.pasta = pc;
        } else if (this.wines.some((w) => w == pc)) {
          c.wine = pc;
        } else if (this.ages.some((a) => a == pc)) {
          c.age = pc;
        }
      }
    });
    // console.log("Solution courrente", this.current);
    // console.log("Solution objectif", this.objectif);
    if (this.isComplet()) {
      var currentCopy: { women: string, shirt: string, name: string, surname: string, pasta: string, wine: string, age: string }[] = [];
      this.objectif.forEach((obj, index) => {
        var pcoreder = this.current.find((cur, index2) => cur.women == obj.women)
        if (pcoreder) {
          currentCopy.push(pcoreder);
        }
      })
      console.log("Current String : " + JSON.stringify(currentCopy));
      console.log("Objectif String : " + JSON.stringify(this.objectif))
      if (JSON.stringify(currentCopy) === JSON.stringify(this.objectif)) {
        this.showModalSuccess = true;
        console.log("success")
      } else {
        this.showModalNotSucess = true;
        console.log("fail")
      }

    }
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
      // console.log(this.nb_propagates[name + pc]);
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

  isComplet(): boolean {
    let complet = true;
    for (let element of this.current) {
      if (element.shirt === '' || element.name === '' || element.surname === '' || element.pasta === '' || element.wine === '' || element.age === '' || element.women === '') {
        complet = false;
        break;
      }
    }
    return complet;
  }

}
