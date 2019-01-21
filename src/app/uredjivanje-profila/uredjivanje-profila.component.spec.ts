import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UredjivanjeProfilaComponent } from './uredjivanje-profila.component';

describe('UredjivanjeProfilaComponent', () => {
  let component: UredjivanjeProfilaComponent;
  let fixture: ComponentFixture<UredjivanjeProfilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UredjivanjeProfilaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UredjivanjeProfilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
