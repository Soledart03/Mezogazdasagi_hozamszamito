import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PolliService } from './poliaiservice';

describe('Poliaiservice', () => {
  let service: PolliService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PolliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
