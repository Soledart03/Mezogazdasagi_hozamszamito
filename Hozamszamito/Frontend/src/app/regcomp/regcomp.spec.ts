/*
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Regcomp } from './regcomp';
import { App } from '../app';
import { FormsModule } from '@angular/forms';
const appMock = jasmine.createSpyObj('Regcomp', ['openMenu', 'logout']);
describe('Regcomp', () => {
  let component: Regcomp;
  let fixture: ComponentFixture<Regcomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Regcomp],
      providers: [
      { provide: Regcomp, useValue: appMock }
    ],
      imports: [HttpClientTestingModule,FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Regcomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/