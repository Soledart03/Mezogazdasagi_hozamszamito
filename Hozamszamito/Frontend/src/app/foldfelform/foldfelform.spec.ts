import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Foldfelform } from './foldfelform';
import { App } from '../app';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('Foldfelform', () => {
  let component: Foldfelform;
  let fixture: ComponentFixture<Foldfelform>;
  const appMock = jasmine.createSpyObj('App', ['openMenu', 'logout']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Foldfelform],
      imports: [HttpClientTestingModule,FormsModule],
      providers: [
      { provide: appMock, useValue: appMock }
    ]
      
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
