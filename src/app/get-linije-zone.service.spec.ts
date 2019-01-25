import { TestBed } from '@angular/core/testing';

import { GetLinijeZoneService } from './get-linije-zone.service';

describe('GetLinijeZoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetLinijeZoneService = TestBed.get(GetLinijeZoneService);
    expect(service).toBeTruthy();
  });
});
