import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedVoznjeManipComponent } from './red-voznje-manip.component';

describe('RedVoznjeManipComponent', () => {
  let component: RedVoznjeManipComponent;
  let fixture: ComponentFixture<RedVoznjeManipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedVoznjeManipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedVoznjeManipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
