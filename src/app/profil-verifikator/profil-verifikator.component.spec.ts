import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilVerifikatorComponent } from './profil-verifikator.component';

describe('ProfilVerifikatorComponent', () => {
  let component: ProfilVerifikatorComponent;
  let fixture: ComponentFixture<ProfilVerifikatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilVerifikatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilVerifikatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
