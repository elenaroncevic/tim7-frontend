import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { KartaService } from '../karta.service';
import { By } from '@angular/platform-browser';
import { ProfilKorisnikComponent } from './profil-korisnik.component';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Korisnik } from '../model/Korisnik';
import { PrijavljenKorisnik } from '../model/PrijavljenKorisnik';

describe('ProfilKorisnikComponent', () => {
  let component: ProfilKorisnikComponent;
  let fixture: ComponentFixture<ProfilKorisnikComponent>;
  let kartaService: KartaService;

  beforeEach(async(() => {

    var korisnik: PrijavljenKorisnik;
    korisnik = new PrijavljenKorisnik();
    korisnik.ime = "Dragana";
    korisnik.prezime = "Hrcek";
    korisnik.korIme = "dragana123";
    korisnik.status = "STUDENT";

    let karteServiceMock = {
      getKarteUlogovanog: jasmine.createSpy('karte').and.returnValue({ subscribe: () => { } })
    };

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return JSON.stringify(korisnik);
    });

    TestBed.configureTestingModule({
      declarations: [ProfilKorisnikComponent],
      providers: [{
        provide: KartaService, useValue: karteServiceMock
      }],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    kartaService = TestBed.get(KartaService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
