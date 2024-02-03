include "globals.mzn";

set of int : PERSONNE = 0..2;
set of int : OBJET = 0..2;
set of int : LIEUX = 0..2;

array[PERSONNE] of var OBJET : objets_p;
array[PERSONNE] of var LIEUX : lieux_p;
array[OBJET] of var LIEUX : lieux_o;

constraint alldifferent(objets_p) /\ alldifferent(lieux_p) /\ alldifferent(lieux_o);
constraint
  forall(p in PERSONNE, o in OBJET) (
    (lieux_p[p] = lieux_o[o]) -> (objets_p[p] = o)
  );

solve satisfy;

output [show(p) ++ ":"++ show(objets_p[p]) ++ ":" ++ show(lieux_p[p])++ "\n" | p in PERSONNE];
