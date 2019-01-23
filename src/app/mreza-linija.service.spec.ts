import { TestBed } from '@angular/core/testing';

import { MrezaLinijaService } from './mreza-linija.service';

describe('MrezaLinijaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MrezaLinijaService = TestBed.get(MrezaLinijaService);
    expect(service).toBeTruthy();
  });
});
