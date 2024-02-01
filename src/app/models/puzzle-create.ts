import {Puzzle} from "./puzzle";

export class PuzzleCreate extends Puzzle {
  private static puzzleName = "createPuzzle.mzn";
  private static puzzleContent = "include \"globals.mzn\";\n" +

    "set of int : PERSONNE = 0..2;\n"+
    "set of int : OBJET = 0..2;\n"+
    "set of int : LIEUX = 0..2;\n"+

    "array[PERSONNE] of var OBJET : objets_p;\n"+
    "array[PERSONNE] of var LIEUX : lieux_p;\n"+
    "array[OBJET] of var LIEUX : Lieux_o;\n"+

    "constraint alldifferent(objets_p) /\\ alldifferent(lieux_p) /\\ alldifferent(Lieux_o);\n"+


    "solve satisfy;\n"+

    "output [show(p) ++ \":\"++ show(objets_p[p]) ++ \":\" ++ show(lieux_p[p])++ \"\\n\" | p in PERSONNE];";


  constructor() {
    super(PuzzleCreate.puzzleName, PuzzleCreate.puzzleContent);
  }
}
