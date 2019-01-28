import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCenovnikComponent } from './edit-cenovnik.component';

describe('EditCenovnikComponent', () => {
  let component: EditCenovnikComponent;
  let fixture: ComponentFixture<EditCenovnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCenovnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCenovnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
