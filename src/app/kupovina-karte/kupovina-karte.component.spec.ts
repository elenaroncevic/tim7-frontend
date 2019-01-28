import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';

import { KupovinaKarteComponent } from './kupovina-karte.component';
import { GetLinijeZoneService } from '../get-linije-zone.service';
import { KartaService } from '../karta.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrijavljenKorisnik } from '../model/PrijavljenKorisnik';

describe('KupovinaKarteComponent', () => {
  let component: KupovinaKarteComponent;
  let fixture: ComponentFixture<KupovinaKarteComponent>;
  let linijeZoneService: GetLinijeZoneService;
  let kartaService: KartaService;
  let router;

  beforeEach(async(() => {
    let linijeZoneServiceMock = {
      getZone: jasmine.createSpy('getLinijeZone').and.returnValue(Promise.resolve())
    };

    let kartaServiceMock = {
      kupiKartu: jasmine.createSpy('getLinijeZone').and.returnValue(Promise.resolve())
    };

    let routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    var korisnik: PrijavljenKorisnik;
    korisnik = new PrijavljenKorisnik();
    korisnik.ime = "Dragana";
    korisnik.prezime = "Hrcek";
    korisnik.korIme = "dragana123";
    korisnik.status = "STUDENT";
    korisnik.email= "dragana.hrcek@gmail.com";

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return JSON.stringify(korisnik);
    });
    
    TestBed.configureTestingModule({
      declarations: [ KupovinaKarteComponent ],
      providers: [{provide: linijeZoneService, useValue: linijeZoneServiceMock},
                  {provide: KartaService, useValue: kartaServiceMock},
                  {provide: Router, useValue: routerMock}, HttpClient, HttpHandler],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(KupovinaKarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    linijeZoneService = TestBed.get(GetLinijeZoneService);
    kartaService = TestBed.get(KartaService);
    router = TestBed.get(Router);
  });
  
  it('nepopunjena forma test', () => {
    component.kupiKartu();
    expect(kartaService.kupiKartu).toHaveBeenCalledTimes(0);
    expect(component.kartaControl.valid).toBeFalsy();
    expect(component.rutaControl.valid).toBeFalsy();
    expect(component.voziloControl.valid).toBeFalsy();
  });

  it('otkazi test', () => {
    component.otkazi();
    expect(router.navigate).toHaveBeenCalledWith(['/profilKorisnik']);
  });

  it('uspesna kupovina karte test', () => {
    component.kartaControl.setValue("GODISNJA");
    component.voziloControl.setValue("TRAMVAJ");
    component.rutaControl.setValue("prigradska");
    component.kupiKartu();
    expect(kartaService.kupiKartu).toHaveBeenCalled();
  });
});