import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenMapsComponent } from './open-maps.component';

describe('OpenMapsComponent', () => {
  let component: OpenMapsComponent;
  let fixture: ComponentFixture<OpenMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
