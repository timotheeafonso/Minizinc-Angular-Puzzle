include "globals.mzn";

set of int : PERSONNE = 0..2;
set of int : OBJET = 0..2;
set of int : LIEUX = 0..2;

array[PERSONNE] of var OBJET : objets_p;
array[PERSONNE] of var LIEUX : lieux_p;
array[OBJET] of var LIEUX : Lieux_o;

constraint alldifferent(objets_p) /\ alldifferent(lieux_p) /\ alldifferent(Lieux_o);


solve satisfy;

output [show(p) ++ ":"++ show(objets_p[p]) ++ ":" ++ show(lieux_p[p])++ "\n" | p in PERSONNE];
