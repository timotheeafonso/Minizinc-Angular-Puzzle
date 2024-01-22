include "globals.mzn";

% Taille du tableau
int: n = 3;

int: magic_sum = n*(n*n+1) div 2;
array[1..n, 1..n] of var 1..n*n: square;

% Tout les chiffres différents
constraint alldifferent([ square[i,j] | i in 1..n, j in 1..n ]);

% Sur toute les lignes colonnes
constraint forall(i in 1..n) (sum(j in 1..n) (square[i,j]) = magic_sum);
constraint forall(j in 1..n) (sum(i in 1..n) (square[i,j]) = magic_sum);

% Sur les diagonales
constraint sum(i in 1..n) (square[i,i]) = magic_sum;
constraint sum(i in 1..n) (square[i,n-i+1]) = magic_sum;


solve satisfy;
