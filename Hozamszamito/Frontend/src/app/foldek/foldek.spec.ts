import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Foldek } from './foldek';
import { Foldservice } from '../foldservice';
import { Gazdaservice } from '../gazdaservice';
import { App } from '../app';
import { BehaviorSubject, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('Foldek', () => {
  let component: Foldek;
  let fixture: ComponentFixture<Foldek>;
  let foldServiceMock: any;
  let gazdaServiceMock: any;
  let appMock: any;
  beforeEach(async () => {
    foldServiceMock = {
      fold$: new BehaviorSubject<any[]>([]),
      loadFoldsByGazdaId: jasmine.createSpy('loadFoldsByGazdaId'),
      deleteFold: jasmine.createSpy('deleteFold'),
      updateFold: jasmine.createSpy('updateFold')
    };
     gazdaServiceMock = {
      gazda$: of({ id: 3 })
    };

    appMock = {
      openMenu: jasmine.createSpy('openMenu')
    };
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,FormsModule],
      declarations: [Foldek],
      providers: [
        { provide: Foldservice, useValue: foldServiceMock },
        { provide: Gazdaservice, useValue: gazdaServiceMock },
        { provide: App, useValue: appMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foldek);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    it('ngOnInit betolti-e a foldeket ID gazdaID alapjan', () => {
    component.ngOnInit();

    foldServiceMock.fold$.next([{ id: 3 }]);
    expect(foldServiceMock.loadFoldsByGazdaId).toHaveBeenCalledWith(3);
  });
    
    it('delfold kitorli a foldet es ujrafrissit', () => {
    spyOn(window, 'alert');
    component.gazdaId = 3;

    const fold = { id: 10 };

    component.delfold(fold);

    expect(foldServiceMock.deleteFold).toHaveBeenCalledWith(10);
    expect(foldServiceMock.loadFoldsByGazdaId).toHaveBeenCalledWith(3);
    //expect(window.alert).toHaveBeenCalledWith('Föld törölve!');
  });

});
