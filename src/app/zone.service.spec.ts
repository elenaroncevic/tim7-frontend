import { TestBed } from '@angular/core/testing';
import { ZoneService } from './zone.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ZoneService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [HttpClient,
        HttpHandler]
    })
  });

  it('should be created', () => {
    const service: ZoneService = TestBed.get(ZoneService);
    expect(service).toBeTruthy();
  });
});
