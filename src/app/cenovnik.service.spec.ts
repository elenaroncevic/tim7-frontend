import { TestBed } from '@angular/core/testing';

import { CenovnikService } from './cenovnik.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';


describe('CenovnikService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient,
        HttpHandler,
        LocalStorage]
    })
  });

  it('should be created', () => {
    const service: CenovnikService = TestBed.get(CenovnikService);
    expect(service).toBeTruthy();
  });
});
