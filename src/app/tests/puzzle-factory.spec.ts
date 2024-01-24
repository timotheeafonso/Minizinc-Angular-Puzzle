import { PuzzleFactoryService } from '../models/factories/puzzle-factory-service';
import {TestBed} from "@angular/core/testing";
import {Puzzle} from "../models/puzzle";
import {DomSanitizer} from "@angular/platform-browser";

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [Puzzle],
    providers: [{
      provide: DomSanitizer,
      useClass: DomSanitizer
    }]
  });
});

describe('PuzzleFactoryService', () => {
  it('should create an instance', () => {
    var domSanitizer = TestBed.get(DomSanitizer);
    expect(new PuzzleFactoryService()).toBeTruthy();
  });
});
