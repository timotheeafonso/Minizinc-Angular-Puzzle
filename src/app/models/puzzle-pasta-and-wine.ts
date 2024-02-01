import {Puzzle} from "./puzzle";

export class PuzzlePastaAndWine extends Puzzle {
  private static puzzleName = "pastaAndWine.mzn";
  private static puzzleContent = "include \"globals.mzn\";\n" +
    "\n" +
    "set of int : WOMAN = 1..5;\n" +
    "enum SHIRT = {blue,green,red,white,yellow};\n" +
    "enum NAME = {Andrea,Holly,Leslie,Victoria,Julie}; \n" +
    "enum SURNAME = {Miller,Davis,Brown,Wilson,Lopes};\n" +
    "enum PASTA = {farfalle,lasagne,penne,spaghetti,ravioli}; \n" +
    "enum WINE = {Australian,Argentine,Chilean,French,Italian}; \n" +
    "set of int : AGE = {30,35,40,45,50};\n" +
    "\n" +
    "\n" +
    "array[WOMAN] of var SURNAME : surnames;\n" +
    "array[WOMAN] of var NAME : names;\n" +
    "array[WOMAN] of var SHIRT : shirts;\n" +
    "array[WOMAN] of var PASTA : pastas;\n" +
    "array[WOMAN] of var WINE : wines;\n" +
    "array[WOMAN] of var AGE : ages;\n" +
    "\n" +
    "constraint alldifferent(surnames) /\\ alldifferent(names) /\\ alldifferent(shirts) /\\ alldifferent(pastas) /\\ alldifferent(wines) /\\ alldifferent(ages);\n" +
    "\n" +
    "%La femme portant la chemise blanche est à côté de la femme qui aime les vins lombards.\n" +
    "constraint exists(w1 , w2 in WOMAN where w1!=w2) (shirts[w1]==white /\\ wines[w2]==Italian /\\ abs(w1-w2)==1);\n" +
    "%Mme Miller est quelque part entre Mme Davis et Mme Brown, dans cet ordre.\n" +
    "constraint exists(w1 , w2 , w3 in WOMAN where alldifferent([w1,w2,w3])) (surnames[w1]==Miller /\\ surnames[w2]==Davis /\\ surnames[w3]==Brown /\\ ((w1>w2 /\\ w1<w3)));% \\/ (w1<w2 /\\ w1>w3)));\n" +
    "%La femme la plus jeune est à la troisième position.\n" +
    "constraint ages[3] = min(ages);\n" +
    "%La femme de 45 ans est quelque part à droite de la femme portant la chemise rouge.\n" +
    "constraint exists(w1 , w2 in WOMAN where w1!=w2) (ages[w1]==45 /\\ shirts[w2]==red /\\ w1 > w2);\n" +
    "%La femme qui aime les vins chiliens aime aussi les farfalles.\n" +
    "constraint exists(w1 in WOMAN) (wines[w1]==Chilean /\\ pastas[w1]==farfalle);\n" +
    "%À la première position se trouve la femme qui aime les vins argentins.\n" +
    "constraint wines[1] == Argentine;\n" +
    "%Andrea est exactement à droite de la femme de 35 ans.\n" +
    "constraint exists(w1 , w2 in WOMAN where w1!=w2) (names[w1]==Andrea /\\ ages[w2]==35 /\\ w1 == w2+1);\n" +
    "%La femme portant la chemise bleue est quelque part entre Mme Davis et Holly, dans cet ordre.\n" +
    "constraint exists(w1 , w2 , w3 in WOMAN where alldifferent([w1,w2,w3])) (shirts[w1]==blue /\\ surnames[w2]==Davis /\\ names[w3]==Holly /\\ ((w1>w2 /\\ w1<w3)));% \\/ (w1<w2 /\\ w1>w3)));\n" +
    "%Victoria est à côté de Leslie.\n" +
    "constraint exists(w1 , w2 in WOMAN where w1!=w2) (names[w1]==Victoria /\\ abs(w1-w2)==1 /\\ names[w2]==Leslie);\n" +
    "%La femme portant la chemise rouge est quelque part à gauche de la femme qui aime les vins australiens.\n" +
    "constraint exists(w1 , w2 in WOMAN where w1!=w2) (shirts[w1]==red /\\ wines[w2]==Australian /\\ w1 < w2);\n" +
    "%Mme Wilson est à côté de la femme de 30 ans.\n" +
    "constraint exists(w1 , w2 in WOMAN where w1!=w2) (surnames[w1]==Wilson /\\ abs(w1-w2)==1 /\\ ages[w2]==30);\n" +
    "%Leslie est exactement à gauche de la femme de 30 ans.\n" +
    "constraint exists(w1 , w2 in WOMAN where w1!=w2) (names[w1]==Leslie /\\ w1==w2-1 /\\ ages[w2]==30);\n" +
    "%Holly est quelque part à droite de la femme portant la chemise rouge.\n" +
    "constraint exists(w1 , w2 in WOMAN where w1!=w2) (names[w1]==Holly /\\ shirts[w2]==red /\\ w1 > w2);\n" +
    "%Mme Brown est exactement à gauche de Julie.\n" +
    "constraint exists(w1 , w2 in WOMAN where w1!=w2) (surnames[w1]==Brown /\\ names[w2]==Julie /\\ w1==w2-1);\n" +
    "%La femme la plus jeune aime les penne.\n" +
    "constraint exists(w in WOMAN)( ages[w] == min(ages) /\\ pastas[w] == penne);\n" +
    "%Mme Wilson porte la chemise blanche.\n" +
    "constraint exists(w in WOMAN) (surnames[w] == Wilson /\\ shirts[w] == white);\n" +
    "%La femme qui aime les lasagnes est quelque part entre la femme qui aime les vins italiens et la femme qui aime les spaghettis, dans cet ordre.\n" +
    "constraint exists(w1 , w2, w3 in WOMAN where alldifferent([w1,w2,w3])) (pastas[w1] == lasagne /\\ wines[w2] == Italian /\\ pastas[w3] == spaghetti /\\ ((w1 > w2 /\\ w1 < w3)));% \\/ (w1 > w2 /\\ w1 < w3)));\n" +
    "%À la deuxième position se trouve la femme portant la chemise bleue.\n" +
    "constraint shirts[2] == blue;\n" +
    "%La femme de 40 ans aime les lasagnes.\n" +
    "constraint exists(w in WOMAN) (ages[w] == 40 /\\ pastas[w] == lasagne);\n" +
    "%Mme Lopes est à la cinquième position.\n" +
    "constraint surnames[5] == Lopes;\n" +
    "%La femme qui aime les vins australiens est quelque part entre Victoria et la femme qui aime les vins de Bordeaux, dans cet ordre.\n" +
    "constraint exists(w1 , w2, w3 in WOMAN where alldifferent([w1,w2,w3])) (wines[w1] == Australian /\\  names[w2]==Victoria /\\ wines[w3] == French /\\ ((w1 > w2 /\\ w1 < w3)));% \\/ (w1 > w2 /\\ w1 < w3)));\n" +
    "%La femme portant la chemise jaune est exactement à gauche de la femme de 35 ans.\n" +
    "constraint exists(w1 , w2 in WOMAN where w1!=w2) (shirts[w1] == yellow /\\ ages[w2] == 35 /\\ w1 == w2-1);\n" +
    "\n" +
    "solve satisfy;\n" +
    "\n" +
    "output [show(w) ++ \":\"++ show(surnames[w]) ++ \":\" ++ show(names[w])++\":\"++show(shirts[w]) ++ \":\"++ show(pastas[w]) ++ \":\" ++ show(wines[w])++\":\"++show(ages[w])++ \"\\n\" | w in WOMAN];";

  constructor() {
    super(PuzzlePastaAndWine.puzzleName, PuzzlePastaAndWine.puzzleContent);
  }
}
