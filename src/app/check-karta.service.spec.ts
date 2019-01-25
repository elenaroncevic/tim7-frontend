import { TestBed } from '@angular/core/testing';

import { CheckKartaService } from './check-karta.service';

describe('CheckKartaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckKartaService = TestBed.get(CheckKartaService);
    expect(service).toBeTruthy();
  });
});
