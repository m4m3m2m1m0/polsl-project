import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConferenceListComponent } from './my-conference-list.component';

describe('ConferenceListComponent', () => {
  let component: MyConferenceListComponent;
  let fixture: ComponentFixture<MyConferenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConferenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConferenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
