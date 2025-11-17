import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MezogazdComp } from './mezogazd-comp';

describe('MezogazdComp', () => {
  let component: MezogazdComp;
  let fixture: ComponentFixture<MezogazdComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MezogazdComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MezogazdComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
