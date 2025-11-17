import { TestBed } from '@angular/core/testing';

import { Mezogazd } from './mezogazd';

describe('Mezogazd', () => {
  let service: Mezogazd;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mezogazd);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
