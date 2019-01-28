import { TestBed } from '@angular/core/testing';

import { CheckKartaService } from './check-karta.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CheckKartaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient,
        HttpHandler]
    })
  });

  it('should be created', () => {
    const service: CheckKartaService = TestBed.get(CheckKartaService);
    expect(service).toBeTruthy();
  });
});
