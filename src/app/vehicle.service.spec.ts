import { TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';

describe('VehicleService', () => {
  
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [HttpClient,
        HttpHandler,
        LocalStorage]
    })
  });

  it('should be created', () => {
    const service: VehicleService = TestBed.get(VehicleService);
    expect(service).toBeTruthy();
  });
});
