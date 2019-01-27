import { TestBed } from '@angular/core/testing';

import { ZahtevKarteService } from './zahtev-karte.service';

describe('ZahtevKarteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZahtevKarteService = TestBed.get(ZahtevKarteService);
    expect(service).toBeTruthy();
  });
});
