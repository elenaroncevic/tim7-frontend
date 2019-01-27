import { TestBed } from '@angular/core/testing';

import { KartaService } from './karta.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

describe('KartaService', () => {

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
    const service: KartaService = TestBed.get(KartaService);
    expect(service).toBeTruthy();
  });
});
