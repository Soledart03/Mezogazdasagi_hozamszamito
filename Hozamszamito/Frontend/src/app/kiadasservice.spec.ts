import { TestBed } from '@angular/core/testing';

import { Kiadasservice } from './kiadasservice';

describe('Kiadasservice', () => {
  let service: Kiadasservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kiadasservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
