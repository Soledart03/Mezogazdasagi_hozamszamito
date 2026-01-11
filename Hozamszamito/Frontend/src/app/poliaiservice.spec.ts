import { TestBed } from '@angular/core/testing';

import { Poliaiservice } from './poliaiservice';

describe('Poliaiservice', () => {
  let service: Poliaiservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Poliaiservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
