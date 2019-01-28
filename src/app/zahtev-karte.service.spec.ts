import { TestBed } from '@angular/core/testing';

import { ZahtevKarteService } from './zahtev-karte.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ZahtevKarteService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [HttpClient,
        HttpHandler]
    })
  });


  it('should be created', () => {
    const service: ZahtevKarteService = TestBed.get(ZahtevKarteService);
    expect(service).toBeTruthy();
  });
});
