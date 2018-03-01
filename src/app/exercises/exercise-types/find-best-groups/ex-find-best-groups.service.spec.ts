import { TestBed, inject } from '@angular/core/testing';

import { ExFindBestGroupsService } from './ex-find-best-groups.service';

describe('ExFindBestGroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExFindBestGroupsService]
    });
  });

  it('should be created', inject([ExFindBestGroupsService], (service: ExFindBestGroupsService) => {
    expect(service).toBeTruthy();
  }));
});
