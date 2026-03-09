import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adatvedelmi } from './adatvedelmi';

describe('Adatvedelmi', () => {
  let component: Adatvedelmi;
  let fixture: ComponentFixture<Adatvedelmi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Adatvedelmi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adatvedelmi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
