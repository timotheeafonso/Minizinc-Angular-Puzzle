import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-puzzle-computer',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './puzzle-computer.component.html',
  styleUrl: './puzzle-computer.component.css'
})
export class PuzzleComputerComponent {
  clickedOnce: { [key: string]: boolean } = {};
  clickedTwice: { [key: string]: boolean } = {};

  cellClicked(name: string, pc: string) {
    this.clickedOnce[name + pc] = true;
    this.clickedTwice[name + pc] = false;
  }

  cellDoubleClicked(name: string, pc: string) {
    this.clickedOnce[name + pc] = false;
    this.clickedTwice[name + pc] = true;
  }
}

