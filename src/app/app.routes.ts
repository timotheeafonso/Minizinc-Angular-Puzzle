import { Routes } from '@angular/router';
import { PuzzleComputerComponent } from './components/puzzle-computer.component';
import { PuzzleMoviesComponent } from './components/puzzle-movies.component';

export const routes: Routes = [
  { path: 'computer-puzzle', component: PuzzleComputerComponent },
  { path: 'movies-puzzle', component: PuzzleMoviesComponent }
];
