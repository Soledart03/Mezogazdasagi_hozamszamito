/*
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Fooldal } from './fooldal';
import { App } from '../app';
import { FormsModule } from '@angular/forms';
import { Loginform } from '../loginform/loginform';
const appMock = jasmine.createSpyObj('App', ['openMenu', 'logout']);
describe('Fooldal', () => {
  let component: Fooldal;
  let fixture: ComponentFixture<Fooldal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fooldal],
      imports: [HttpClientTestingModule,FormsModule],
      providers: [
      { provide: appMock, useValue: appMock },
      { provide: App, useValue: appMock },
      { provide: Loginform, useValue: appMock }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fooldal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/