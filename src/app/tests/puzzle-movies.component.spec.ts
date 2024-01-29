import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleMoviesComponent } from '../components/puzzle-movies.component';

describe('PuzzleMoviesComponent', () => {
  let component: PuzzleMoviesComponent;
  let fixture: ComponentFixture<PuzzleMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
