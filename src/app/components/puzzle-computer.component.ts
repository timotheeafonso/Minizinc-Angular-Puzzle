import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

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
  clickedOnce: { [key: string]: boolean } = {};
  clickedTwice: { [key: string]: boolean } = {};
  annule: { [key: string]: boolean } = {};

  cellClicked(name: string, pc: string) {
    if(this.clickedOnce[name + pc] == undefined && this.clickedTwice[name + pc] == undefined && this.annule[name + pc] == undefined) {
        this.cellClickedOnce(name, pc);
    }else if(this.clickedOnce[name + pc] ){
        this.cellClickedTwice(name, pc);
    }else if(this.clickedTwice[name + pc]  ) {
        this.cellAnnule(name,pc);
    }else if(this.annule[name + pc] ) {
        this.cellClickedOnce(name, pc);
    }
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
  }

  cellAnnule(name: string, pc: string) {
    this.clickedOnce[name + pc] = false;
    this.clickedTwice[name + pc] = false;
    this.annule[name + pc] = true;
  }
}

