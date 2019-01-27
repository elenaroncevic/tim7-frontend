import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotvrdaZahtevaComponent } from './potvrda-zahteva.component';

describe('PotvrdaZahtevaComponent', () => {
  let component: PotvrdaZahtevaComponent;
  let fixture: ComponentFixture<PotvrdaZahtevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotvrdaZahtevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotvrdaZahtevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
