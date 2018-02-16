import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesFormComponent } from './exercises-form.component';

describe('ExercisesFormComponent', () => {
  let component: ExercisesFormComponent;
  let fixture: ComponentFixture<ExercisesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
