import { TestBed, inject } from '@angular/core/testing';

import { MinimizeExprService } from './minimize-expr.service';

describe('MinimizeExprService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MinimizeExprService]
    });
  });

  it('should be created', inject([MinimizeExprService], (service: MinimizeExprService) => {
    expect(service).toBeTruthy();
  }));
});
