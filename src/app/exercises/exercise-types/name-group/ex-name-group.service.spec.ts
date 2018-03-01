import { TestBed, inject } from '@angular/core/testing';

import { ExNameGroupService } from './ex-name-group.service';

describe('ExNameGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExNameGroupService]
    });
  });

  it('should be created', inject([ExNameGroupService], (service: ExNameGroupService) => {
    expect(service).toBeTruthy();
  }));
});
