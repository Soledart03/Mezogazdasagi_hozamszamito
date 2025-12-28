import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Terv } from './terv';

describe('Terv', () => {
  let component: Terv;
  let fixture: ComponentFixture<Terv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Terv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Terv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
