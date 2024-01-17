include "globals.mzn";

set of int : WOMAN = 1..5;
enum SHIRT = {blue,green,red,white,yellow};
enum NAME = {Andrea,Holly,Leslie,Victoria,Julie}; 
enum SURNAME = {Miller,Davis,Brown,Wilson,Lopes};
enum PASTA = {farfalle,lasagne,penne,spaghetti,ravioli}; 
enum WINE = {Australian,Argentine,Chilean,French,Italian}; 
set of int : AGE = {30,35,40,45,50};


array[WOMAN] of var SURNAME : surnames;
array[WOMAN] of var NAME : names;
array[WOMAN] of var SHIRT : shirts;
array[WOMAN] of var PASTA : pastas;
array[WOMAN] of var WINE : wines;
array[WOMAN] of var AGE : ages;

constraint alldifferent(surnames) /\ alldifferent(names) /\ alldifferent(shirts) /\ alldifferent(pastas) /\ alldifferent(wines) /\ alldifferent(ages);

%La femme portant la chemise blanche est à côté de la femme qui aime les vins lombards.
constraint exists(w1 , w2 in WOMAN where w1!=w2) (shirts[w1]==white /\ wines[w2]==Italian /\ abs(w1-w2)==1);
%Mme Miller est quelque part entre Mme Davis et Mme Brown, dans cet ordre.
constraint exists(w1 , w2 , w3 in WOMAN where alldifferent([w1,w2,w3])) (surnames[w1]==Miller /\ surnames[w2]==Davis /\ surnames[w3]==Brown /\ ((w1>w2 /\ w1<w3)));% \/ (w1<w2 /\ w1>w3)));
%La femme la plus jeune est à la troisième position.
constraint ages[3] = min(ages);
%La femme de 45 ans est quelque part à droite de la femme portant la chemise rouge.
constraint exists(w1 , w2 in WOMAN where w1!=w2) (ages[w1]==45 /\ shirts[w2]==red /\ w1 > w2);
%La femme qui aime les vins chiliens aime aussi les farfalles.
constraint exists(w1 in WOMAN) (wines[w1]==Chilean /\ pastas[w1]==farfalle);
%À la première position se trouve la femme qui aime les vins argentins.
constraint wines[1] == Argentine;
%Andrea est exactement à droite de la femme de 35 ans.
constraint exists(w1 , w2 in WOMAN where w1!=w2) (names[w1]==Andrea /\ ages[w2]==35 /\ w1 == w2+1);
%La femme portant la chemise bleue est quelque part entre Mme Davis et Holly, dans cet ordre.
constraint exists(w1 , w2 , w3 in WOMAN where alldifferent([w1,w2,w3])) (shirts[w1]==blue /\ surnames[w2]==Davis /\ names[w3]==Holly /\ ((w1>w2 /\ w1<w3)));% \/ (w1<w2 /\ w1>w3)));
%Victoria est à côté de Leslie.
constraint exists(w1 , w2 in WOMAN where w1!=w2) (names[w1]==Victoria /\ abs(w1-w2)==1 /\ names[w2]==Leslie);
%La femme portant la chemise rouge est quelque part à gauche de la femme qui aime les vins australiens.
constraint exists(w1 , w2 in WOMAN where w1!=w2) (shirts[w1]==red /\ wines[w2]==Australian /\ w1 < w2);
%Mme Wilson est à côté de la femme de 30 ans.
constraint exists(w1 , w2 in WOMAN where w1!=w2) (surnames[w1]==Wilson /\ abs(w1-w2)==1 /\ ages[w2]==30);
%Leslie est exactement à gauche de la femme de 30 ans.
constraint exists(w1 , w2 in WOMAN where w1!=w2) (names[w1]==Leslie /\ w1==w2-1 /\ ages[w2]==30);
%Holly est quelque part à droite de la femme portant la chemise rouge.
constraint exists(w1 , w2 in WOMAN where w1!=w2) (names[w1]==Holly /\ shirts[w2]==red /\ w1 > w2);
%Mme Brown est exactement à gauche de Julie.
constraint exists(w1 , w2 in WOMAN where w1!=w2) (surnames[w1]==Brown /\ names[w2]==Julie /\ w1==w2-1);
%La femme la plus jeune aime les penne.
constraint exists(w in WOMAN)( ages[w] == min(ages) /\ pastas[w] == penne);
%Mme Wilson porte la chemise blanche.
constraint exists(w in WOMAN) (surnames[w] == Wilson /\ shirts[w] == white);
%La femme qui aime les lasagnes est quelque part entre la femme qui aime les vins italiens et la femme qui aime les spaghettis, dans cet ordre.
constraint exists(w1 , w2, w3 in WOMAN where alldifferent([w1,w2,w3])) (pastas[w1] == lasagne /\ wines[w2] == Italian /\ pastas[w3] == spaghetti /\ ((w1 > w2 /\ w1 < w3)));% \/ (w1 > w2 /\ w1 < w3)));
%À la deuxième position se trouve la femme portant la chemise bleue.
constraint shirts[2] == blue;
%La femme de 40 ans aime les lasagnes.
constraint exists(w in WOMAN) (ages[w] == 40 /\ pastas[w] == lasagne);
%Mme Lopes est à la cinquième position.
constraint surnames[5] == Lopes;
%La femme qui aime les vins australiens est quelque part entre Victoria et la femme qui aime les vins de Bordeaux, dans cet ordre.
constraint exists(w1 , w2, w3 in WOMAN where alldifferent([w1,w2,w3])) (wines[w1] == Australian /\  names[w2]==Victoria /\ wines[w3] == French /\ ((w1 > w2 /\ w1 < w3)));% \/ (w1 > w2 /\ w1 < w3)));
%La femme portant la chemise jaune est exactement à gauche de la femme de 35 ans.
constraint exists(w1 , w2 in WOMAN where w1!=w2) (shirts[w1] == yellow /\ ages[w2] == 35 /\ w1 == w2-1);

solve satisfy;

output [show(w) ++ ":"++ show(surnames[w]) ++ ":" ++ show(names[w])++":"++show(shirts[w]) ++ ":"++ show(pastas[w]) ++ ":" ++ show(wines[w])++":"++show(ages[w])++ "\n" | w in WOMAN];