import { TestBed } from '@angular/core/testing';

import { Foldservice } from './foldservice';

describe('Foldservice', () => {
  let service: Foldservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Foldservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
