import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-puzzle',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    FormsModule,
    CommonModule
  ],
  templateUrl: '../templates/create-puzzle.component.html',
  styleUrl: '../css/create-puzzle.component.css'
})
export class CreatePuzzleComponent {
  clickedOnce: { [key: string]: boolean } = {};
  clickedTwice: { [key: string]: boolean } = {};
  annule: { [key: string]: boolean } = {};
  propagates: { [key: string]: boolean } = {};
  nb_propagates: { [key: string]: number } = {};

  peoples: { name: string, object: string, lieu: string }[] = [
    { name: '', object: '', lieu: '' },
    { name: '', object: '', lieu: '' },
    { name: '', object: '', lieu: '' }
  ];
  objects: { name: string, personne: string, lieu: string }[] = [
    { name: '', personne: '', lieu: '' },
    { name: '', personne: '', lieu: '' },
    { name: '', personne: '', lieu: '' }
  ];
  places: { name: string, object: string, personne: string }[] = [
    { name: '', object: '', personne: '' },
    { name: '', object: '', personne: '' },
    { name: '', object: '', personne: '' }
  ];

  showInitForm : boolean = true;
  showContraintes: boolean = false;
  showTable: boolean = false;
  onSubmit() {
    console.log("okokokokokokok");
      console.log(this.peoples);
  }
  cellClicked(name: string, pc: string) {
    console.log(name);
    console.log(pc);
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
    if (this.peoples.some(person => person.name == name)) {
      this.peoples.forEach((m) => {if(m.name != name) {var1.push(m.name)}});
    }else if (this.objects.some(obj => obj.name == name)) {
      this.objects.forEach((o) => {if(o.name != name) {var1.push(o.name)}});
    }else if (this.places.some(place => place.name == name)) {
      this.places.forEach((pl) => {if(pl.name != name) {var1.push(pl.name)}});
    }

    if (this.peoples.some(person => person.name == pc)) {
      this.peoples.forEach((m) => {if(m.name != pc) {var2.push(m.name)}});
    }else if (this.objects.some(obj => obj.name == pc)) {
      this.objects.forEach((o) => {if(o.name != pc) {var2.push(o.name)}});
    }else if (this.places.some(place => place.name == pc)) {
      this.places.forEach((pl) => {if(pl.name != pc) {var2.push(pl.name)}});
    }
    console.log(var1);
    console.log(var2);
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

  protected readonly Object = Object;
}

