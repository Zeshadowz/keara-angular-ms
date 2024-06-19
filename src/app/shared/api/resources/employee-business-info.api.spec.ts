import { TestBed } from '@angular/core/testing';

import { EmployeeBusinessInfoApi } from './employee-business-info.api';

describe('EmployeeBusinessInfoApiService', () => {
  let service: EmployeeBusinessInfoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeBusinessInfoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
