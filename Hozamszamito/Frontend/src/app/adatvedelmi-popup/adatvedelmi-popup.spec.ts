import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdatvedelmiPopup } from './adatvedelmi-popup';

describe('AdatvedelmiPopup', () => {
  let component: AdatvedelmiPopup;
  let fixture: ComponentFixture<AdatvedelmiPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdatvedelmiPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdatvedelmiPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
