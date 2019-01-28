import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { KorisnikService } from '../korisnik.service';

import { Router } from "@angular/router";
import { UredjivanjeProfilaComponent } from './uredjivanje-profila.component';
import { PrijavljenKorisnik } from '../model/PrijavljenKorisnik';

describe('UredjivanjeProfilaComponent', () => {
  let component: UredjivanjeProfilaComponent;
  let fixture: ComponentFixture<UredjivanjeProfilaComponent>;

  let izmenaProfilaService: KorisnikService;
let router ;
  beforeEach(async(() => {

    
    var korisnik: PrijavljenKorisnik;
    korisnik = new PrijavljenKorisnik();
    korisnik.ime = "Dragana";
    korisnik.prezime = "Hrcek";
    korisnik.korIme = "dragana123";
    korisnik.status = "STUDENT";
    korisnik.email= "dragana.hrcek@gmail.com";

    let izmenaPodatakaServiceMock = {
      izmenaLicnihPodataka: jasmine.createSpy('izmenaProfila').and.returnValue(Promise.resolve())
    };

    let routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return JSON.stringify(korisnik);
    });

    TestBed.configureTestingModule({
      declarations: [ UredjivanjeProfilaComponent ],
      providers: [{
        provide: KorisnikService, useValue: izmenaPodatakaServiceMock},{provide: Router, useValue: routerMock}],
        imports: [ReactiveFormsModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UredjivanjeProfilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    izmenaProfilaService = TestBed.get(KorisnikService);
    router = TestBed.get(Router);
  });

  it('inicijalno forma popunjena podacima ulogovanog test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ime.value).toEqual("Dragana");
    expect(component.prezime.value).toEqual("Hrcek");
    expect(component.email.value).toEqual("dragana.hrcek@gmail.com");
  });


  it('uspesna izmena licnih podatak test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.ime.setValue("test");
    component.prezime.setValue("test");
    component.email.setValue("test@gmail.com");

    component.izmenaProfila();
    expect(izmenaProfilaService.izmenaLicnihPodataka).toHaveBeenCalledTimes(1);
  });
  it('nepopunjena forma test', () => {

    component.ngOnInit();
    fixture.detectChanges();
    component.ime.setValue("");
    component.prezime.setValue("");
    component.email.setValue("");

    component.izmenaProfila();

    expect(izmenaProfilaService.izmenaLicnihPodataka).toHaveBeenCalledTimes(0);
    expect(component.ime.valid).toBeFalsy();
    expect(component.prezime.valid).toBeFalsy();
    expect(component.email.valid).toBeFalsy();
    
  });

  it('nepostojeci email test', () => {

    component.ngOnInit();
    fixture.detectChanges();
    component.ime.setValue("test");
    component.prezime.setValue("test");
    component.email.setValue("nepostojeca email adresa");

    component.izmenaProfila();

    expect(izmenaProfilaService.izmenaLicnihPodataka).toHaveBeenCalledTimes(0);
    expect(component.ime.valid).toBeTruthy();
    expect(component.prezime.valid).toBeTruthy();
    expect(component.email.valid).toBeFalsy();
    
  });
});
