import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Navbar } from './navbar';
import { App } from '../app';
import { Gazdaservice } from '../gazdaservice';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

const appMock = jasmine.createSpyObj('App', ['openMenu', 'logout']);
describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
const gazdaSubject = new BehaviorSubject<any>(null);

  const gazdaServiceMock = {
    gazda$: gazdaSubject.asObservable(),
    clearGazda: jasmine.createSpy('clearGazda')
  };

  const appMock = {
    openMenu: jasmine.createSpy('openMenu')
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Navbar],
      imports: [HttpClientTestingModule,FormsModule],
      providers: [
      { provide: App, useValue: appMock },
        { provide: Gazdaservice, useValue: gazdaServiceMock }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('loginsuccess = true ha a gazda belep', () => {
    gazdaSubject.next({ id: 1, name: 'Teszt Gazda' });

    expect(component.loginsucces).toBeTrue();
  });

  it('torli a gazdat ha kijelentkezik', () => {
    spyOn(window, 'alert');

    component.logout();

    expect(gazdaServiceMock.clearGazda).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Sikeresen kijelentkeztél!');
  });
});
