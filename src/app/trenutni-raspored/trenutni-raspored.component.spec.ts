import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenutniRasporedComponent } from './trenutni-raspored.component';

describe('TrenutniRasporedComponent', () => {
  let component: TrenutniRasporedComponent;
  let fixture: ComponentFixture<TrenutniRasporedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrenutniRasporedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenutniRasporedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
