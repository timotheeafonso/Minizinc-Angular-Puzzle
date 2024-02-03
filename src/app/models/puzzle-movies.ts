import {Puzzle} from "./puzzle";

export class PuzzleMovies extends Puzzle {
  private static puzzleName = "movies.mzn";
  private static puzzleContent = "include \"globals.mzn\";\n" +
    "enum NAME = {Jessica,Laurie,Mark,Mary,Sally};\n" +
    "enum FILM = {Minutes,Donnie_Brasco,Scarecrow,Scarface,The_recruit};\n" +
    "enum DAY = {Monday,Tuesday,Wednesday,Thursday,Friday};\n" +
    "set of int : NUM_DAY = 1..5;\n" +
    "enum GENRE = {M,F};\n" +
    "set of int : TIME = {35,40,80,90,105}; \n" +
    "set of int : RELEASE = {1983,1973,1997,2007,2003}; \n" +
    "\n" +
    "array[FILM] of var NAME : names;\n" +
    "array[FILM] of var DAY : days;\n" +
    "array[FILM] of var TIME : times;\n" +
    "array[FILM] of var RELEASE : releases;\n" +
    "array[NAME] of var GENRE : genres;\n" +
    "array[DAY] of var NUM_DAY : num_days;\n" +
    "\n" +
    "constraint releases[Minutes]==2007 /\\ releases[Donnie_Brasco]==1997 /\\ releases[Scarecrow]==1973 /\\ releases[Scarface]==1983 /\\ releases[The_recruit]==2003;\n" +
    "constraint genres[Jessica]==F /\\ genres[Laurie]==F /\\ genres[Mark]==M /\\ genres[Mary]==F /\\ genres[Sally]==M;\n" +
    "constraint num_days[Monday]==1 /\\ num_days[Tuesday]==2 /\\ num_days[Wednesday]==3 /\\ num_days[Thursday]==4 /\\ num_days[Friday]==5;\n" +
    "constraint alldifferent(names) /\\ alldifferent(times) /\\ alldifferent(days);\n" +
    "%1. Parmi les sorties des années 2000, aucune n'était le choix de Jessica ; l'une a débuté la semaine et l'autre l'a terminée.   \n" +
    "constraint not exists(f in FILM) (releases[f]>=2000 /\\ names[f]==Jessica);\n" +
    "constraint exists(f in FILM)(releases[f]>=2000 /\\ days[f]==Monday) /\\ exists(f in FILM)(releases[f]>=2000 /\\ days[f]==Friday);\n" +
    "%2. Le dernier des films sortis dans les années 1900 a été projeté à 30 minutes de l'heure. \n" +
    "constraint exists(f in FILM)(releases[f]==1997 /\\ (times[f]==60-30 \\/ times[f]==120-30));\n" +
    "%3. Les sorties diffusées avant 20h00 étaient les uns à la suite des autres, tout comme celles diffusées après 20h00.  \n" +
    "constraint exists(f1, f2 in FILM)(times[f1]<60  /\\ times[f2]<60 /\\ abs(num_days[days[f1]]-num_days[days[f2]])==1);\n" +
    "%4. Un homme et une femme ont eu une projection avant 20h00, mais aucune n'était au milieu de la semaine. \n" +
    "constraint exists(f in FILM)(genres[names[f]]==M /\\ times[f]<60 /\\ days[f]!=Wednesday );\n" +
    "constraint exists(f in FILM)(genres[names[f]]==F /\\ times[f]<60 /\\ days[f]!=Wednesday );\n" +
    "%5. Mark, dont le choix était Scarecrow, a eu une projection une heure et cinq minutes après celle de Scarface. \n" +
    "constraint names[Scarecrow]==Mark /\\ times[Scarecrow] == times[Scarface]+65;\n" +
    "%6. Ni Miss Farmer ni Miss Peters n'ont eu de projection un jour pair. \n" +
    "constraint not exists(f in FILM)((names[f]==Jessica \\/ names [f]==Mary) /\\ (num_days[days[f]] mod 2)==0);\n" +
    "%7. 88 Minutes a été projeté à la fois 40 minutes avant l'heure et 40 minutes après la projection du jeudi. \n" +
    "constraint (times[Minutes] == 60-40 \\/ times[Minutes] == 120-40) /\\ exists(f in FILM)(times[f]==times[Minutes]-40 /\\ days[f]==Thursday);\n" +
    "\n" +
    "solve satisfy;\n" +
    "\n" +
    "output [show(f) ++ \":\"++ show(names[f]) ++ \":\" ++ show(days[f])++\":\"++show(times[f])++ \"\\n\" | f in FILM];";

  constructor() {
    super(PuzzleMovies.puzzleName, PuzzleMovies.puzzleContent);
  }
}
