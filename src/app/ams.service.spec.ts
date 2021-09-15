import { TestBed } from '@angular/core/testing';

import { AmsService } from './ams.service';

describe('AmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmsService = TestBed.get(AmsService);
    expect(service).toBeTruthy();
  });
});
