import { TestBed, inject } from '@angular/core/testing';

import { ExKmapToExprService } from './ex-kmap-to-expr.service';

describe('ExKmapToExprService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExKmapToExprService]
    });
  });

  it('should be created', inject([ExKmapToExprService], (service: ExKmapToExprService) => {
    expect(service).toBeTruthy();
  }));
});
