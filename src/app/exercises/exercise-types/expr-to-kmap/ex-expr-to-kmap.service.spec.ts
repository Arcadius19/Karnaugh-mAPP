import { TestBed, inject } from '@angular/core/testing';

import { ExExprToKmapService } from './ex-expr-to-kmap.service';

describe('ExExprToKmapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExExprToKmapService]
    });
  });

  it('should be created', inject([ExExprToKmapService], (service: ExExprToKmapService) => {
    expect(service).toBeTruthy();
  }));
});
