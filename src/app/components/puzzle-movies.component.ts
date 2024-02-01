import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

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

