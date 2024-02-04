import {Component, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PuzzleMovies} from "../models/puzzle-movies";
import {ModalSuccessComponent} from "./modal-success.component";

@Component({
  selector: 'app-puzzle-computer',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    ModalSuccessComponent
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
  start: boolean = false;
  films = ['88 minutes', 'Donnie Brasco', 'Scarecrow', 'Scarface', 'The Recruit'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  times = ['7:35 pm', '7:40 pm', '8:20 pm', '8:30 pm', '8:45 pm'];
  people = ['Jessica', 'Laurie', 'Mark', 'Mary', 'Sally'];
  evidences = [
    'Of the 20-hundreds releases, neither of which was Jessica\'s choice, one opened the week and one closed the week.',
    'The latest of the 19-hundreds releases was shown at 30 minutes past the hour.',
    'The releases shown before 8:00 pm were on consecutive days, as were the releases shown after 8:00 pm.',
    'One of the men and one of the women had a showing before 8:00 pm, but neither was mid-week.',
    'Mark, whose choice was Scarecrow, had a showing at a time of one hour and five minutes after that of Scarface.',
    'Neither Miss Farmer nor Miss Peters had a showing on an even-numbered day',
    '88 Minutes showed at a time both 40 minutes to the hour and 40 minutes after the Thursday showing.'
  ]
  @ViewChild(ModalSuccessComponent) modalSuccess: any;
  showModalSuccess = false;
  showModalNotSucess = false;
  current: { name: string, film: string, day: string, time: string }[] = [
    {name: 'Jessica', film: '', day: '', time: ''},
    {name: 'Laurie', film: '', day: '', time: ''},
    {name: 'Mark', film: '', day: '', time: ''},
    {name: 'Mary', film: '', day: '', time: ''},
    {name: 'Sally', film: '', day: '', time: ''}
  ];

  objectif: { name: string, film: string, day: string, time: string }[] = [
    {name: '', film: '', day: '', time: ''},
    {name: '', film: '', day: '', time: ''},
    {name: '', film: '', day: '', time: ''},
    {name: '', film: '', day: '', time: ''},
    {name: '', film: '', day: '', time: ''}
  ];

  constructor() {
    this.puzzle = new PuzzleMovies();
    this.solution = this.puzzle.solveModel();

    this.solution.then(() => {
      console.log(this.solution);
      if (this.solution["__zone_symbol__value"].status == "ALL_SOLUTIONS") {
        var strSol = this.solution["__zone_symbol__value"].solution.output.default.split("\n");
        strSol.forEach((ligne: string, index2: number) => {
          var affectation = ligne.split(":");
          affectation.forEach((val: any, index: number) => {
            if (val != '') {
              if (index == 0) {
                if (val == 'Minutes') {
                  val = '88 minutes';
                } else if (val == 'Donnie_Brasco') {
                  val = 'Donnie Brasco';
                } else if (val == 'The_recruit') {
                  val = 'The Recruit';
                }
                this.objectif[index2].film = val;
              } else if (index == 1) {
                this.objectif[index2].name = val;
              } else if (index == 2) {
                this.objectif[index2].day = val;
              } else if (index == 3) {
                if (val == '35') {
                  val = '7:35 pm';
                } else if (val == '40') {
                  val = '7:40 pm';
                } else if (val == '80') {
                  val = '8:20 pm';
                } else if (val == '90') {
                  val = '8:30 pm';
                } else if (val == '105') {
                  val = '8:45 pm';
                }
                this.objectif[index2].time = val;
              }
            }
          })
        })
      }
      this.start = true;
      console.log(this.objectif);
    });

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
  }

  cellClickedTwice(name: string, pc: string) {
    this.clickedOnce[name + pc] = false;
    this.clickedTwice[name + pc] = true;
    this.annule[name + pc] = false;

    this.current.forEach((c) => {
      if (c.name == name) {
        if (this.films.some((f) => f == pc)) {
          c.film = pc;
        } else if (this.days.some((d) => d == pc)) {
          c.day = pc;
        } else if (this.times.some((t) => t == pc)) {
          c.time = pc;
        }
      }
    });
    console.log("Solution courrente", this.current);
    if (this.isComplet()) {
      var currentCopy: { name: string, film: string, day: string, time: string }[] = [];
      this.objectif.forEach((obj, index) => {
        var pcoreder = this.current.find((cur, index2) => cur.name == obj.name)
        if (pcoreder) {
          currentCopy.push(pcoreder);
        }
      })
      console.log(currentCopy);
      if (JSON.stringify(currentCopy) === JSON.stringify(this.objectif)) {
        this.showModalSuccess = true;
      } else {
        this.showModalNotSucess = true;
      }

    }
  }

  isComplet(): boolean {
    let complet = true;
    for (let element of this.current) {
      if (element.name === '' || element.day === '' || element.time === '' || element.film === '') {
        complet = false;
        break;
      }
    }
    return complet;
  }

  cellAnnule(name: string, pc: string) {
    this.clickedOnce[name + pc] = false;
    this.clickedTwice[name + pc] = false;
    this.annule[name + pc] = true;
    this.current.forEach((c)=>{
      if(c.name == name){
        if(this.days.some((obj)=> obj == pc)){
          c.day = '';
        }else if(this.films.some((obj)=> obj == pc)){
          c.film = '';
        }else if(this.times.some((obj)=> obj == pc)){
          c.time = '';
        }
      }
    });
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

  showSuccessModal() {

  }

}

