import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCenovnikComponent } from './form-cenovnik.component';

describe('FormCenovnikComponent', () => {
  let component: FormCenovnikComponent;
  let fixture: ComponentFixture<FormCenovnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCenovnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCenovnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
