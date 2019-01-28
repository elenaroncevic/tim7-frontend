import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { KorisnikService } from '../korisnik.service';
import { By } from '@angular/platform-browser';
import { RegistracijaComponent } from './registracija.component';

describe('RegistracijaComponent', () => {
  let component: RegistracijaComponent;
  let fixture: ComponentFixture<RegistracijaComponent>;

  let registracijaService: KorisnikService;

  beforeEach(async(() => {

    let registracijaServiceMock = {
      registracija: jasmine.createSpy('registracija').and.returnValue(Promise.resolve())
    };
    TestBed.configureTestingModule({
      declarations: [ RegistracijaComponent ],
      providers: [{
        provide: KorisnikService, useValue: registracijaServiceMock}],
        imports: [ReactiveFormsModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    registracijaService = TestBed.get(KorisnikService);
  });

  it('inicijalno forma prazana test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.korIme.value).toEqual("");
    expect(component.lozinka1.value).toEqual("");
    expect(component.lozinka2.value).toEqual("");
    expect(component.email.value).toEqual("");
    expect(component.ime.value).toEqual("");
    expect(component.prezime.value).toEqual("");
 
  });
  it('nepostojeca email adresa', () => {

    component.ngOnInit();
    fixture.detectChanges();
    component.korIme.setValue("test");
    component.lozinka1.setValue("testtest");
    component.lozinka2.setValue("testtest");
    component.ime.setValue("test");
    component.prezime.setValue("test");
    component.email.setValue("nepostojeci email");

    component.onSubmit();
 expect(registracijaService.registracija).toHaveBeenCalledTimes(0);
    expect(component.korIme.valid).toBeTruthy();
    expect(component.lozinka1.valid).toBeTruthy();
    expect(component.lozinka2.valid).toBeTruthy();
    expect(component.ime.valid).toBeTruthy();
    expect(component.prezime.valid).toBeTruthy();
    expect(component.email.valid).toBeFalsy();
    
 
  });

  it('kratka lozinka test', () => {

    component.ngOnInit();
    fixture.detectChanges();
    component.korIme.setValue("test");
    component.lozinka1.setValue("test");
    component.lozinka2.setValue("testtest");
    component.ime.setValue("test");
    component.prezime.setValue("test");
    component.email.setValue("dragana.hrcek@gmail.com");

    component.onSubmit();
 expect(registracijaService.registracija).toHaveBeenCalledTimes(0);
    expect(component.korIme.valid).toBeTruthy();
    expect(component.lozinka1.valid).toBeFalsy();
    expect(component.lozinka2.valid).toBeTruthy();
    expect(component.ime.valid).toBeTruthy();
    expect(component.prezime.valid).toBeTruthy();
    expect(component.email.valid).toBeTruthy();
    
 
  });

  it('uspesna registracija', () => {

    component.ngOnInit();
    fixture.detectChanges();
    component.korIme.setValue("test");
    component.lozinka1.setValue("testtest");
    component.lozinka2.setValue("testtest");
    component.ime.setValue("test");
    component.prezime.setValue("test");
    component.email.setValue("dragana.hrcek@gmail.com");
    component.onSubmit();

    expect(registracijaService.registracija).toHaveBeenCalled();
 
  });


  it('pokusaj registracije sa nepopunjenom formom test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.korIme.value).toEqual("");
    expect(component.lozinka1.value).toEqual("");
    expect(component.lozinka2.value).toEqual("");
    expect(component.email.value).toEqual("");
    expect(component.ime.value).toEqual("");
    expect(component.prezime.value).toEqual("");

    component.onSubmit();
    expect(registracijaService.registracija).toHaveBeenCalledTimes(0);

    expect(component.korIme.valid).toBeFalsy();
    expect(component.lozinka1.valid).toBeFalsy();
    expect(component.lozinka2.valid).toBeFalsy();
    expect(component.ime.valid).toBeFalsy();
    expect(component.prezime.valid).toBeFalsy();
    expect(component.email.valid).toBeFalsy();
 
  });
});