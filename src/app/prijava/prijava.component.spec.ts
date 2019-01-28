import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { PrijavaComponent } from './prijava.component';
import { KorisnikService } from '../korisnik.service';


describe('PrijavaComponent', () => {
  let component: PrijavaComponent;
  let fixture: ComponentFixture<PrijavaComponent>; 

  let prijavaService: KorisnikService;

  beforeEach(async(() => {
    let prijavaServiceMock = {
      prijava: jasmine.createSpy('prijava').and.returnValue(Promise.resolve())
    };


    TestBed.configureTestingModule({
      declarations: [ PrijavaComponent ],
      providers: [{
                  provide: KorisnikService, useValue: prijavaServiceMock}],
                  imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrijavaComponent);
    component = fixture.componentInstance;
    prijavaService = TestBed.get(KorisnikService);
  });

  it('inicijalno polja prazana test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.korIme.value).toEqual("");
    expect(component.lozinka1.value).toEqual("");
  });

  it('uspesan login test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.korIme.setValue("test");
    component.lozinka1.setValue("test");
    component.onSubmit();

    expect(prijavaService.prijava).toHaveBeenCalled();
  });

  it('neuspesan login lozinka test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.korIme.setValue("test");
    component.lozinka1.setValue("");

    component.onSubmit();
    expect(prijavaService.prijava).toHaveBeenCalledTimes(0);
    expect(component.korIme.valid).toBeTruthy();
    expect(component.lozinka1.valid).toBeFalsy();
  });

  it('neuspesan login korIme test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.korIme.setValue("");
    component.lozinka1.setValue("test");

    component.onSubmit();
    expect(prijavaService.prijava).toHaveBeenCalledTimes(0);
    expect(component.korIme.valid).toBeFalsy();
    expect(component.lozinka1.valid).toBeTruthy();
  });

  it('pokusaj prijave sa nepopunjenom formom test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.korIme.setValue("");
    component.lozinka1.setValue("");

    component.onSubmit();
    expect(prijavaService.prijava).toHaveBeenCalledTimes(0);
    expect(component.korIme.valid).toBeFalsy();
    expect(component.lozinka1.valid).toBeFalsy();
  });


});
