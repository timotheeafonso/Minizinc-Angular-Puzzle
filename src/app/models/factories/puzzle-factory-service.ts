import { Injectable } from '@angular/core';
import { Puzzle } from '../puzzle';
import {PuzzleComputer} from "../puzzle-computer";

@Injectable({
  providedIn: 'root',
})
export class PuzzleFactoryService {

  public getPuzzleInstance(type: string) {
    if(type == "computer")
      return new PuzzleComputer();
    else if (type == "movies")
      return new PuzzleComputer()
    else if (type == "pastaAndWine")
      return new PuzzleComputer()
    else
      return new PuzzleComputer()
  }
}
