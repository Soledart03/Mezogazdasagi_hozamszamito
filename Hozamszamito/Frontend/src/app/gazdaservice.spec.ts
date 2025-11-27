import { TestBed } from '@angular/core/testing';

import { Gazdaservice } from './gazdaservice';

describe('Gazdaservice', () => {
  let service: Gazdaservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gazdaservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
