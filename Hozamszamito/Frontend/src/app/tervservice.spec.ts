import { TestBed } from '@angular/core/testing';

import { Tervservice } from './tervservice';

describe('Tervservice', () => {
  let service: Tervservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tervservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
