import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKorisnikComponent } from './profil-korisnik.component';

describe('ProfilKorisnikComponent', () => {
  let component: ProfilKorisnikComponent;
  let fixture: ComponentFixture<ProfilKorisnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilKorisnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
