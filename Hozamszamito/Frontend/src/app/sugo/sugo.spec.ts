import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sugo } from './sugo';

describe('Sugo', () => {
  let component: Sugo;
  let fixture: ComponentFixture<Sugo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sugo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sugo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
