import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { IzmenaLozinkeComponent } from './izmena-lozinke.component';
import { KorisnikService } from '../korisnik.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

describe('IzmenaLozinkeComponent', () => {
  let component: IzmenaLozinkeComponent;
  let fixture: ComponentFixture<IzmenaLozinkeComponent>;

  let izmenaLozinkeService: KorisnikService;
  let router;


  beforeEach(async(() => {
    let izmenaLozinkeServiceMock = {
      izmenaLozinke: jasmine.createSpy('getLinijeZone').and.returnValue(Promise.resolve()),
      redirectProfil: jasmine.createSpy('getLinijeZone').and.returnValue(Promise.resolve())
    };

    let routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [ IzmenaLozinkeComponent ],
      providers: [{provide: KorisnikService, useValue: izmenaLozinkeServiceMock},
                  {provide: Router, useValue: routerMock}, HttpClient, HttpHandler],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaLozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    izmenaLozinkeService = TestBed.get(KorisnikService);
    router = TestBed.get(Router);
  });

  it('uspesna izmena lozinke test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.trenutna.setValue("12345678");
    component.nova1.setValue("87654321");
    component.nova2.setValue("87654321");

    component.izmenaLozinke();
    expect(izmenaLozinkeService.izmenaLozinke).toHaveBeenCalledTimes(1);
   
  });

  it('kratka nova lozinka test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.trenutna.setValue("12345678");
    component.nova1.setValue("876");
    component.nova2.setValue("876");

    component.izmenaLozinke();
    expect(izmenaLozinkeService.izmenaLozinke).toHaveBeenCalledTimes(0);

    expect(component.trenutna.valid).toBeTruthy();
    expect(component.nova1.valid).toBeFalsy();
    expect(component.nova2.valid).toBeTruthy();
   
  });

  it('nepopunjena forma test', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.trenutna.setValue("");
    component.nova1.setValue("");
    component.nova2.setValue("");

    component.izmenaLozinke();
    expect(izmenaLozinkeService.izmenaLozinke).toHaveBeenCalledTimes(0);
    expect(component.trenutna.valid).toBeFalsy();
    expect(component.nova1.valid).toBeFalsy();
    expect(component.nova2.valid).toBeFalsy();
  });
 

  it('otkazi test', () => {
    component.otkazi();
    expect(izmenaLozinkeService.redirectProfil).toHaveBeenCalledTimes(1);
  });


});