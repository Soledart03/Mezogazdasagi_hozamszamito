import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foldek } from './foldek';
import { Foldservice } from '../foldservice';
import { Gazdaservice } from '../gazdaservice';
import { App } from '../app';
import { BehaviorSubject, of } from 'rxjs';

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
      gazda$: of({ id: 5 })
    };

    appMock = {
      openMenu: jasmine.createSpy('openMenu')
    };
    await TestBed.configureTestingModule({
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
    it('ngOnInit should load folds by gazdaId', () => {
    component.ngOnInit();

    foldServiceMock.fold$.next([{ id: 5 }]);
    expect(foldServiceMock.loadFoldsByGazdaId).toHaveBeenCalledWith(5);
  });
    it('openEdit should set selectedFold and enable editing', () => {
    const fold = { id: 1, terulet: 10 };

    component.openEdit(fold);

    expect(component.selectedFold).toEqual(fold);
    expect(component.selectedFold).not.toBe(fold); 
    expect(component.editing).toBeTrue();
  });
    it('delfold should delete fold and reload list', () => {
    spyOn(window, 'alert');
    component.gazdaId = 3;

    const fold = { id: 10 };

    component.delfold(fold);

    expect(foldServiceMock.deleteFold).toHaveBeenCalledWith(10);
    expect(foldServiceMock.loadFoldsByGazdaId).toHaveBeenCalledWith(3);
    expect(window.alert).toHaveBeenCalledWith('Föld törölve!');
  });

});
