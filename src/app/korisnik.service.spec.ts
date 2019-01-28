import { TestBed } from '@angular/core/testing';

import { KorisnikService } from './korisnik.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

describe('KorisnikServiceService', () => {
  beforeEach(() => {
    let routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [HttpClient,
        HttpHandler,
        { provide: Router, useValue: routerMock }]
    })
  });

  it('should be created', () => {
    const service: KorisnikService = TestBed.get(KorisnikService);
    expect(service).toBeTruthy();
  });
});
