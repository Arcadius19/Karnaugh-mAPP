import { TestBed, inject } from '@angular/core/testing';

import { ExLabelSquaresService } from './label-squares.service';

describe('ExLabelSquaresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExLabelSquaresService]
    });
  });

  it('should be created', inject([ExLabelSquaresService], (service: ExLabelSquaresService) => {
    expect(service).toBeTruthy();
  }));
});
