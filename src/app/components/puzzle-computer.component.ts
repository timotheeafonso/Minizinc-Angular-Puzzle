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
  clickedOnce: { [key: string]: boolean } = {};
  clickedTwice: { [key: string]: boolean } = {};
  annule: { [key: string]: boolean } = {};
  propagates: { [key: string]: boolean } = {};
  nb_propagates: { [key: string]: number } = {};
  monitor = ['13\'','15\'', '15.6\'', '21.5\'', '27\''];
  processor =['2.0 MHz', '2.3 MHz', '2.5 MHz', '2.7 MHz', '3.1 MHz'];
  disk = ['250 Gb', '320 Gb', '500 Gb', '750 Gb', '1024 Gb'];
  price =['$ 699,00', '$ 999,00', '$ 1.149,00', '$ 1.349,00', '$ 1.649,00'];
  evidences = ['Andrew bought the computer which was three hundred Euros less than the PC which has a processor that is 0.4 MHz more powerful than the one which has a 21.5\' screen.',
  'The five computers are: the one chosen by Andrew (which doesn\'t have the 27\' screen), the one which has the 2.0-MHz processor, the computer that has a 250 GB HD, the one which has a price of 1,149 Euros and the computer (which doesn\'t have the 15\' screen) that has the HD bigger than the one chosen by Andrew but smaller than that the one which has the 2.7 MHz processor.',
  'The computer with the 320 Gb HD has either the 2.0 or the 2.3 MHz processor.The processor of the computer which has the 15\' screen is more powerful than the one in the computer that costs 999 euros but less powerful than the processor that is included in the 1,349 Euros computer.',
  'The computer that has the 27\' screen doesn\'t have the 320 Gb hard drive. The 500 GB HD is included in the computer that has a more powerful processor and a larger size screen than the one which costs 699 euros (which doesn\'t include the 320 Gb HD).']

  constructor() {
    this.puzzle = new PuzzleComputer();
    this.solution = this.puzzle.solveModel();
  }

  cellClicked(name: string, pc: string) {
    if(this.propagates[name + pc] == false || this.propagates[name + pc] == undefined) {
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

  propage(name: string, pc: string){
    var var1: string[] = [];
    var var2: string[] =[];
    if(this.monitor.includes(name)){
      this.monitor.forEach((m) => {if(m != name) {var1.push(m)}});
    }else if(this.processor.includes(name)) {
      this.processor.forEach((m) => {if(m != name) {var1.push(m)}});
    }else if(this.disk.includes(name)) {
      this.disk.forEach((m) => {if(m != name) {var1.push(m)}});
    }else if(this.price.includes(name)) {
      this.price.forEach((m) => {if(m != name) {var1.push(m)}});
    }

    if(this.monitor.includes(pc)){
      this.monitor.forEach((m) => {if(m != pc) {var2.push(m)}});
    }else if(this.processor.includes(pc)) {
      this.processor.forEach((m) => {if(m != pc) {var2.push(m)}});
    }else if(this.disk.includes(pc)) {
      this.disk.forEach((m) => {if(m != pc) {var2.push(m)}});
    }else if(this.price.includes(pc)) {
      this.price.forEach((m) => {if(m != pc) {var2.push(m)}});
    }

    var1.forEach((v1 : string) : void => {
      if (this.clickedTwice[name+pc]) {
        //this.cellClickedOnce(v1, pc);
        this.cellPropagate(v1,pc)
      } else if(this.annule[name+pc]){
        //if(this.clickedOnce[v1+pc]) {
          this.cellReversePropagate(v1,pc)
          //this.cellAnnule(v1, pc);
        //}
      }
    })
    var2.forEach((v2 : string) : void => {
      if (this.clickedTwice[name+pc]) {
        //this.cellClickedOnce(name, v2);
        this.cellPropagate(name,v2);
      }else if(this.annule[name+pc]) {
          //if(this.clickedOnce[name+v2]) {
            this.cellReversePropagate(name,v2);
            //this.cellAnnule(name, v2);
          //}
      }
    })

  }
  cellClickedOnce(name: string, pc: string) {
    this.clickedOnce[name + pc] = true;
    this.clickedTwice[name + pc] = false;
    this.annule[name + pc] = false;
    if(this.solution["__zone_symbol__state"]) {
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

    if((this.clickedTwice[name + pc]==false || this.clickedTwice[name + pc]==undefined)  && (this.clickedOnce[name + pc]==false || this.clickedOnce[name + pc]==undefined )) {
      this.propagates[name + pc] = true;
      if(this.nb_propagates[name + pc] == undefined)
        this.nb_propagates[name + pc]=1;
      else this.nb_propagates[name + pc]+=1;
      console.log(this.nb_propagates[name + pc]);
    }
  }

  cellReversePropagate(name: string, pc: string) {
    if((this.clickedTwice[name + pc]==false || this.clickedTwice[name + pc]==undefined)  && (this.clickedOnce[name + pc]==false || this.clickedOnce[name + pc]==undefined )) {
      if (this.nb_propagates[name + pc] == 1) {
        this.propagates[name + pc] = false;
        this.nb_propagates[name + pc] -=1;
      } else if (this.nb_propagates[name + pc] > 1) {
        this.nb_propagates[name + pc] -=1;
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


}

