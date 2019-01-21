import { TestBed } from '@angular/core/testing';

import { IzlistavanjeKarataService } from './izlistavanje-karata.service';

describe('IzlistavanjeKarataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IzlistavanjeKarataService = TestBed.get(IzlistavanjeKarataService);
    expect(service).toBeTruthy();
  });
});
