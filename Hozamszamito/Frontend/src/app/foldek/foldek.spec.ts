import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foldek } from './foldek';

describe('Foldek', () => {
  let component: Foldek;
  let fixture: ComponentFixture<Foldek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Foldek]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foldek);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
