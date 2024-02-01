import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {PuzzleFactoryService} from "../models/factories/puzzle-factory-service";
import {SolveProgress} from "minizinc";
import {PuzzleComputer} from "../models/puzzle-computer";

@Component({
  selector: 'app-puzzle-computer',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: '../templates/puzzle-computer.component.html',
  styleUrl: '../css/puzzle-computer.component.css'
})

export class PuzzleComputerComponent {
  public solution: any;
  private puzzle: any;

  constructor() {
    this.puzzle = new PuzzleComputer();
    this.solution = this.puzzle.solveModel();
    console.log("solve : " + this.solution);
  }

  clickedOnce: { [key: string]: boolean } = {};
  clickedTwice: { [key: string]: boolean } = {};

  cellClicked(name: string, pc: string) {
    this.clickedOnce[name + pc] = true;
    this.clickedTwice[name + pc] = false;
    if(this.solution["__zone_symbol__state"]) {
      console.log(JSON.stringify(this.solution["__zone_symbol__value"].solution.output.json));
    } else {
      console.log("solving");
    }
  }

  cellDoubleClicked(name: string, pc: string) {
    this.clickedOnce[name + pc] = false;
    this.clickedTwice[name + pc] = true;
  }
}

