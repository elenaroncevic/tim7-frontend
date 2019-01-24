import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVozilaComponent } from './admin-vozila.component';

describe('AdminVozilaComponent', () => {
  let component: AdminVozilaComponent;
  let fixture: ComponentFixture<AdminVozilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVozilaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVozilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
