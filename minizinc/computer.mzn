include "globals.mzn";

set of int : PC = 1..5;
set of int : MONITOR = {13,15,156,215,27};
set of int: HARD_DISK = {250,320,500,750,1024};
set of int : PROCESSOR = {20,23,25,27,31}; 
set of int : PRICE = {699,999,1149,1349,1649}; 

array[PC] of var MONITOR : monitors;
array[PC] of var HARD_DISK : hard_disks;
array[PC] of var PROCESSOR : processors;
array[PC] of var PRICE : prices;

constraint alldifferent(monitors) /\ alldifferent(hard_disks) /\ alldifferent(processors) /\ alldifferent(prices);

constraint exists(p_andrew in PC)
(
%1. Andrew a acheté l'ordinateur qui coûtait trois cents euros de moins que le PC qui a un processeur plus puissant de 0,4 MHz que celui qui a un écran de 21,5 pouces.
exists(p2,p3 in PC where alldifferent([p_andrew, p2, p3]))(prices[p_andrew]==prices[p2]-300 /\ processors[p2]==processors[p3]+4 /\ monitors[p3]==215) /\
%2. Les cinq ordinateurs sont : celui choisi par Andrew (qui n'a pas un écran de 27 pouces), celui qui a un processeur de 2,0 MHz, l'ordinateur qui a un disque dur de 250 Go, celui qui a un prix de 1 149 euros et l'ordinateur (qui n'a pas un écran de 15 pouces) qui a un disque dur plus grand que celui choisi par Andrew mais plus petit que celui qui a un processeur de 2,7 MHz.
exists( p2, p3, p4, p5 in PC where alldifferent([p_andrew, p2, p3, p4, p5]))(monitors[p_andrew]!=27 /\ processors[p2]==20 /\ hard_disks[p3]==250 /\ prices[p4]==1149 /\ monitors[p5]!=15 /\ hard_disks[p5] >hard_disks[p_andrew] /\ exists(p in PC)(p!=p5 /\ processors[p]==27 /\ hard_disks[p5]< hard_disks[p])) /\
%3. L'ordinateur avec le disque dur de 320 Go a soit le processeur de 2,0 GHz soit celui de 2,3 GHz. Le processeur de l'ordinateur qui a l'écran de 15 pouces est plus puissant que celui de l'ordinateur qui coûte 999 euros mais moins puissant que le processeur inclus dans l'ordinateur de 1 349 euros.
exists(p in PC)(hard_disks[p]==320 /\ (processors[p]==20 \/ processors[p]==23)) /\
exists(p1, p2, p3 in PC where alldifferent([p1,p2,p3]))(monitors[p1]==15 /\ processors[p1]>processors[p2] /\ prices[p2]==999 /\ processors[p1]<processors[p3] /\ prices[p3]==1349) /\
%4. L'ordinateur qui a l'écran de 27 pouces n'a pas le disque dur de 320 Go. Le disque dur de 500 Go est inclus dans l'ordinateur qui a un processeur plus puissant et un écran de taille plus grande que celui qui coûte 699 euros (qui n'inclut pas le disque dur de 320 Go).
exists(p in PC)(monitors[p]==27 /\ hard_disks[p]!=320) /\
exists(p1, p2 in PC where p1!=p2)(hard_disks[p1]==500 /\ processors[p1]>processors[p2] /\ monitors[p1]>monitors[p2] /\ prices[p2]==699 /\ hard_disks[p2]!= 320)
);

solve satisfy;

output [show(p) ++ ":"++ show(monitors[p]) ++ ":" ++ show(hard_disks[p])++":"++show(processors[p])++":"++show(prices[p])++ "\n" | p in PC];