import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tervform } from './tervform';

describe('Tervform', () => {
  let component: Tervform;
  let fixture: ComponentFixture<Tervform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tervform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tervform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
