import { TestBed } from '@angular/core/testing';

import { GetZoneService } from './get-zone.service';

describe('GetZoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetZoneService = TestBed.get(GetZoneService);
    expect(service).toBeTruthy();
  });
});
