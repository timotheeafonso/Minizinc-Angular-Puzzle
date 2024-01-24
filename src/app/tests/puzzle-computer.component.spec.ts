import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleComputerComponent } from '../components/puzzle-computer.component';

describe('PuzzleComputerComponent', () => {
  let component: PuzzleComputerComponent;
  let fixture: ComponentFixture<PuzzleComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleComputerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
