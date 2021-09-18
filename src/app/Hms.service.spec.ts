import { TestBed } from '@angular/core/testing';

import { HmsService } from './hms.service';

describe('HmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HmsService = TestBed.get(HmsService);
    expect(service).toBeTruthy();
  });
});
