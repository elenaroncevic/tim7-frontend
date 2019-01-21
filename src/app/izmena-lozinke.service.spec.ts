import { TestBed } from '@angular/core/testing';

import { IzmenaLozinkeService } from './izmena-lozinke.service';

describe('IzmenaLozinkeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IzmenaLozinkeService = TestBed.get(IzmenaLozinkeService);
    expect(service).toBeTruthy();
  });
});
