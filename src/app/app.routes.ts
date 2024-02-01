import { Routes } from '@angular/router';
import { PuzzleComputerComponent } from './components/puzzle-computer.component';
import { PuzzleMoviesComponent } from './components/puzzle-movies.component';
import {PuzzlePastaAndWineComponent} from "./components/puzzle-pasta-and-wine.component";

export const routes: Routes = [
  { path: 'computer-puzzle', component: PuzzleComputerComponent },
  { path: 'movies-puzzle', component: PuzzleMoviesComponent },
  { path: 'pasta-and-wine-puzzle', component: PuzzlePastaAndWineComponent }
];
