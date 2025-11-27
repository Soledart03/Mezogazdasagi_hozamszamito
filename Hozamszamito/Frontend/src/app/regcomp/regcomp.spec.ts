import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regcomp } from './regcomp';

describe('Regcomp', () => {
  let component: Regcomp;
  let fixture: ComponentFixture<Regcomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Regcomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Regcomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
