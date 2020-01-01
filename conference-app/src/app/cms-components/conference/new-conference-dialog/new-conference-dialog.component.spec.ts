import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConferenceDialogComponent } from './new-conference-dialog.component';

describe('NewConferenceDialogComponent', () => {
  let component: NewConferenceDialogComponent;
  let fixture: ComponentFixture<NewConferenceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConferenceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConferenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
