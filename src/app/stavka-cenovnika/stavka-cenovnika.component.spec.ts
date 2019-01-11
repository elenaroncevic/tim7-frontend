import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StavkaCenovnikaComponent } from './stavka-cenovnika.component';

describe('StavkaCenovnikaComponent', () => {
  let component: StavkaCenovnikaComponent;
  let fixture: ComponentFixture<StavkaCenovnikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StavkaCenovnikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StavkaCenovnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
