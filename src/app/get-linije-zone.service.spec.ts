import { TestBed } from '@angular/core/testing';

import { GetLinijeZoneService } from './get-linije-zone.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('GetLinijeZoneService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient,
        HttpHandler]
    })
  });

  it('should be created', () => {
    const service: GetLinijeZoneService = TestBed.get(GetLinijeZoneService);
    expect(service).toBeTruthy();
  });
});
