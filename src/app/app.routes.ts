import { Routes } from '@angular/router';
import { PuzzleComputerComponent } from './components/puzzle-computer.component';
import { PuzzleMoviesComponent } from './components/puzzle-movies.component';
import { CreatePuzzleComponent } from './components/create-puzzle.component';

export const routes: Routes = [
  { path: 'computer-puzzle', component: PuzzleComputerComponent },
  { path: 'movies-puzzle', component: PuzzleMoviesComponent },
  { path: 'create-puzzle', component: CreatePuzzleComponent }

];
