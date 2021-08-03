import { TestBed } from '@angular/core/testing';

import { SlickService } from './slick.service';

describe('SlickService', () => {
  let service: SlickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
