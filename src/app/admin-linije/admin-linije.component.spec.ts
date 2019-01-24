import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLinijeComponent } from './admin-linije.component';

describe('AdminLinijeComponent', () => {
  let component: AdminLinijeComponent;
  let fixture: ComponentFixture<AdminLinijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLinijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLinijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
