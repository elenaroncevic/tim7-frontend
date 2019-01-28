import { TestBed } from '@angular/core/testing';
import { LinijeService } from './linije.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LinijeService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [HttpClient,
        HttpHandler]
    })
  });

  it('should be created', () => {
    const service: LinijeService = TestBed.get(LinijeService);
    expect(service).toBeTruthy();
  });
});
