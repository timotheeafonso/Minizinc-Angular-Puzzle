import { Puzzle } from '../models/puzzle';
import {DomSanitizer} from "@angular/platform-browser";
import {TestBed} from "@angular/core/testing";

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [Puzzle],
    providers: [{
      provide: DomSanitizer,
      useClass: DomSanitizer
    }]
  });
});

describe('Puzzle', () => {
  it('should create an instance', () => {
    var domSanitizer = TestBed.get(DomSanitizer);
    expect(new Puzzle("")).toBeTruthy();
  });
});
