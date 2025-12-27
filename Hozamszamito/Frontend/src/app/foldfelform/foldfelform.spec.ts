import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foldfelform } from './foldfelform';

describe('Foldfelform', () => {
  let component: Foldfelform;
  let fixture: ComponentFixture<Foldfelform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Foldfelform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foldfelform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
