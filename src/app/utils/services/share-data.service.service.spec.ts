import { TestBed } from '@angular/core/testing';

import { ShareDataService } from './share-data.service';

describe('ShareDataServiceService', () => {
  let service: ShareDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
