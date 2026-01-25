import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kiadasok } from './kiadasok';

describe('Kiadasok', () => {
  let component: Kiadasok;
  let fixture: ComponentFixture<Kiadasok>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Kiadasok]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kiadasok);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
