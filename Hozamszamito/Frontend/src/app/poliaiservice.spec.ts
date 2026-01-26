import { TestBed } from '@angular/core/testing';

import { PolliService } from './poliaiservice';

describe('Poliaiservice', () => {
  let service: PolliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
