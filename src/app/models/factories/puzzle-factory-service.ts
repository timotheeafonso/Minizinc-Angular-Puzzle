import { Injectable } from '@angular/core';
import { Puzzle } from '../puzzle';

@Injectable({
  providedIn: 'root',
})
export class PuzzleFactoryService {

  public getPuzzleInstance(type: string) {
    if(type == "computer")
      return new Puzzle("computer.mzn");
    else if (type == "movies")
      return new Puzzle("movies.mzn")
    else if (type == "pastaAndWine")
      return new Puzzle("pastaAndWine.mzn")
    else if (type == "createPuzzle")
      return new Puzzle("createPuzzle.mzn")
    else
      return new Puzzle("carreMagique.mzn")
  }
}
