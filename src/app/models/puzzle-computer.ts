import {Puzzle} from "./puzzle";

export class PuzzleComputer extends Puzzle {
  private static puzzleName = "computer.mzn";
  private static puzzleContent = "include \"globals.mzn\";\n" +
    "\n" +
    "set of int : PC = 1..5;\n" +
    "set of int : MONITOR = {13,15,156,215,27};\n" +
    "set of int: HARD_DISK = {250,320,500,750,1024};\n" +
    "set of int : PROCESSOR = {20,23,25,27,31}; \n" +
    "set of int : PRICE = {699,999,1149,1349,1649}; \n" +
    "\n" +
    "array[PC] of var MONITOR : monitors;\n" +
    "array[PC] of var HARD_DISK : hard_disks;\n" +
    "array[PC] of var PROCESSOR : processors;\n" +
    "array[PC] of var PRICE : prices;\n" +
    "\n" +
    "constraint alldifferent(monitors) /\\ alldifferent(hard_disks) /\\ alldifferent(processors) /\\ alldifferent(prices);\n" +
    "\n" +
    "constraint exists(p_andrew in PC)\n" +
    "(\n" +
    "%1. Andrew a acheté l'ordinateur qui coûtait trois cents euros de moins que le PC qui a un processeur plus puissant de 0,4 MHz que celui qui a un écran de 21,5 pouces.\n" +
    "exists(p2,p3 in PC where alldifferent([p_andrew, p2, p3]))(prices[p_andrew]==prices[p2]-300 /\\ processors[p2]==processors[p3]+4 /\\ monitors[p3]==215) /\\\n" +
    "%2. Les cinq ordinateurs sont : celui choisi par Andrew (qui n'a pas un écran de 27 pouces), celui qui a un processeur de 2,0 MHz, l'ordinateur qui a un disque dur de 250 Go, celui qui a un prix de 1 149 euros et l'ordinateur (qui n'a pas un écran de 15 pouces) qui a un disque dur plus grand que celui choisi par Andrew mais plus petit que celui qui a un processeur de 2,7 MHz.\n" +
    "exists( p2, p3, p4, p5 in PC where alldifferent([p_andrew, p2, p3, p4, p5]))(monitors[p_andrew]!=27 /\\ processors[p2]==20 /\\ hard_disks[p3]==250 /\\ prices[p4]==1149 /\\ monitors[p5]!=15 /\\ hard_disks[p5] >hard_disks[p_andrew] /\\ exists(p in PC)(p!=p5 /\\ processors[p]==27 /\\ hard_disks[p5]< hard_disks[p])) /\\\n" +
    "%3. L'ordinateur avec le disque dur de 320 Go a soit le processeur de 2,0 GHz soit celui de 2,3 GHz. Le processeur de l'ordinateur qui a l'écran de 15 pouces est plus puissant que celui de l'ordinateur qui coûte 999 euros mais moins puissant que le processeur inclus dans l'ordinateur de 1 349 euros.\n" +
    "exists(p in PC)(hard_disks[p]==320 /\\ (processors[p]==20 \\/ processors[p]==23)) /\\\n" +
    "exists(p1, p2, p3 in PC where alldifferent([p1,p2,p3]))(monitors[p1]==15 /\\ processors[p1]>processors[p2] /\\ prices[p2]==999 /\\ processors[p1]<processors[p3] /\\ prices[p3]==1349) /\\\n" +
    "%4. L'ordinateur qui a l'écran de 27 pouces n'a pas le disque dur de 320 Go. Le disque dur de 500 Go est inclus dans l'ordinateur qui a un processeur plus puissant et un écran de taille plus grande que celui qui coûte 699 euros (qui n'inclut pas le disque dur de 320 Go).\n" +
    "exists(p in PC)(monitors[p]==27 /\\ hard_disks[p]!=320) /\\\n" +
    "exists(p1, p2 in PC where p1!=p2)(hard_disks[p1]==500 /\\ processors[p1]>processors[p2] /\\ monitors[p1]>monitors[p2] /\\ prices[p2]==699 /\\ hard_disks[p2]!= 320)\n" +
    ");\n" +
    "\n" +
    "solve satisfy;\n" +
    "\n" +
    "output [show(p) ++ \":\"++ show(monitors[p]) ++ \":\" ++ show(processors[p])++\":\"++show(hard_disks[p])++\":\"++show(prices[p])++ \"\\n\" | p in PC];";

  public res = { ["13'"]:13, ["15'"]:15, ["15,6'"]:156, ["21,5'"]:215, ["27'"]:27}
  public proc = {["2.0 MHz"]:20,["2.3 MHz"]:23,["2.5 MHz"]:25,["2.7 MHz"]:27,["3.1 MHz"]:31}
  public hdd = {["250 Gb"]:250,["320 Gb"]:320,["500 Gb"]:500,["750 Gb"]:750,["1014 Gb"]:1024}
  public price = {["$ 699,00"]:699,["$ 999,00"]:999,["$ 1.149,00"]:1149,["$ 1.349,00"]:1349,["$ 1.649,00"]:1649}

  constructor() {
    super(PuzzleComputer.puzzleName, PuzzleComputer.puzzleContent);
  }
}
