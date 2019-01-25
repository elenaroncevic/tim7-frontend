import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveraKarteComponent } from './provera-karte.component';

describe('ProveraKarteComponent', () => {
  let component: ProveraKarteComponent;
  let fixture: ComponentFixture<ProveraKarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveraKarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveraKarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
