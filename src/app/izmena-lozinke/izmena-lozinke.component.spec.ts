import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaLozinkeComponent } from './izmena-lozinke.component';

describe('IzmenaLozinkeComponent', () => {
  let component: IzmenaLozinkeComponent;
  let fixture: ComponentFixture<IzmenaLozinkeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzmenaLozinkeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaLozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
