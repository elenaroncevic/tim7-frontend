import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKondukterComponent } from './profil-kondukter.component';

describe('ProfilKondukterComponent', () => {
  let component: ProfilKondukterComponent;
  let fixture: ComponentFixture<ProfilKondukterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilKondukterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilKondukterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
