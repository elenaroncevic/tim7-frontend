import { TestBed } from '@angular/core/testing';

import { RegistracijaService } from './registracija.service';

describe('RegistracijaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistracijaService = TestBed.get(RegistracijaService);
    expect(service).toBeTruthy();
  });
});
