import { TestBed } from '@angular/core/testing';

import { IzmenaLicnihPodatakaService } from './izmena-licnih-podataka.service';

describe('IzmenaLicnihPodatakaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IzmenaLicnihPodatakaService = TestBed.get(IzmenaLicnihPodatakaService);
    expect(service).toBeTruthy();
  });
});
