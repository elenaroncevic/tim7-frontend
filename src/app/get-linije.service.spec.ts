import { TestBed } from '@angular/core/testing';

import { GetLinijeService } from './get-linije.service';

describe('GetLinijeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetLinijeService = TestBed.get(GetLinijeService);
    expect(service).toBeTruthy();
  });
});
