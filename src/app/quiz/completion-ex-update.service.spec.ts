import { TestBed, inject } from '@angular/core/testing';

import { CompletionExUpdateService } from './completion-ex-update.service';

describe('CompletionExUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompletionExUpdateService]
    });
  });

  it('should be created', inject([CompletionExUpdateService], (service: CompletionExUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
