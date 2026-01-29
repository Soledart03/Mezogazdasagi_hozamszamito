import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kiadfelform } from './kiadfelform';

describe('Kiadfelform', () => {
  let component: Kiadfelform;
  let fixture: ComponentFixture<Kiadfelform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Kiadfelform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kiadfelform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
