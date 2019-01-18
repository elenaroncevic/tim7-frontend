import { TestBed } from '@angular/core/testing';

import { PrijavaService } from './prijava.service';

describe('PrijavaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrijavaService = TestBed.get(PrijavaService);
    expect(service).toBeTruthy();
  });
});
