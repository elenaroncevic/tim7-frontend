import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaniceComponent } from './admin-stanice.component';

describe('AdminStaniceComponent', () => {
  let component: AdminStaniceComponent;
  let fixture: ComponentFixture<AdminStaniceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStaniceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
