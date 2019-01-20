import { TestBed } from '@angular/core/testing';

import { TipKorisnikaService } from './tip-korisnika.service';

describe('TipKorisnikaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipKorisnikaService = TestBed.get(TipKorisnikaService);
    expect(service).toBeTruthy();
  });
});
