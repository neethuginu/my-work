import { TestBed } from '@angular/core/testing';

import { CompanyappsService } from './companyapps.service';

describe('CompanyappsService', () => {
  let service: CompanyappsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyappsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
