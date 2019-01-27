import { TestBed } from '@angular/core/testing';

import { RasporedVoznjeService } from './raspored-voznje.service';

describe('RasporedVoznjeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RasporedVoznjeService = TestBed.get(RasporedVoznjeService);
    expect(service).toBeTruthy();
  });
});
