import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {PuzzleFactoryService} from "../models/factories/puzzle-factory-service";
import {Puzzle} from "../models/puzzle";
import {waitForAsync} from "@angular/core/testing";

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
  private solution: any ;
  private puzzle: any;

  constructor(private puzzleFactory: PuzzleFactoryService) {
    this.puzzle = new Puzzle("computer.mzn");
    this.puzzle.solveModel() ;
  }

  clickedOnce: { [key: string]: boolean } = {};
  clickedTwice: { [key: string]: boolean } = {};

  cellClicked(name: string, pc: string) {
    this.clickedOnce[name + pc] = true;
    this.clickedTwice[name + pc] = false;
    console.log( this.puzzle.solveModel()) ;

  }

  cellDoubleClicked(name: string, pc: string) {
    this.clickedOnce[name + pc] = false;
    this.clickedTwice[name + pc] = true;
  }
}
