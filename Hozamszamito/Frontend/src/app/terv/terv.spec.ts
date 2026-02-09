import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Gazdaservice } from '../gazdaservice';
import { Tervservice } from '../tervservice';
import { Foldservice } from '../foldservice';
import { Terv } from './terv';
import { App } from '../app';
import { of } from 'rxjs';
describe('Terv', () => {
  let component: Terv;
  let fixture: ComponentFixture<Terv>;
  const appMock = { openMenu: jasmine.createSpy('openMenu') };
 const gazdaMock = {
    gazda$: of({ id: 1 })
  };

  const tervServiceMock = {
    terv$: of([]),
    loadNoveny: () => of([]),
    loadnovinp: () => of([]),
    loadConnNovinp: () => of([]),
    loadVetomag: () => of([]),
    loadMutragya: () => of([])
  };

  const foldServiceMock = {
    fold$: of([]),
    getFoldida: () => of([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Terv],
      imports: [HttpClientTestingModule],
      providers: [
  { provide: App, useValue: jasmine.createSpyObj('App', ['openMenu']) },
  { provide: Gazdaservice, useValue: gazdaMock },
        { provide: Tervservice, useValue: tervServiceMock },
        { provide: Foldservice, useValue: foldServiceMock }
]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Terv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('openEdit megnyitja-e az editinget es lemasolja-e a tervet', () => {
    const mockTerv = { id: 5, fold_id: 2 };

    component.openEdit(mockTerv);

    expect(component.editing).toBeTrue();
    expect(component.selectedTerv).toEqual(mockTerv);
    expect(component.selectedTerv).not.toBe(mockTerv);
  });
});
