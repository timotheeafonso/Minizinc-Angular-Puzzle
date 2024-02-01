import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlePastaAndWineComponent } from '../components/puzzle-pasta-and-wine.component';

describe('PuzzlePastaAndWineComponent', () => {
  let component: PuzzlePastaAndWineComponent;
  let fixture: ComponentFixture<PuzzlePastaAndWineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzlePastaAndWineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzlePastaAndWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
