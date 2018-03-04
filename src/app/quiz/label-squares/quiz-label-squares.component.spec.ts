import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizLabelSquaresComponent } from './quiz-label-squares.component';

describe('QuizLabelSquaresComponent', () => {
  let component: QuizLabelSquaresComponent;
  let fixture: ComponentFixture<QuizLabelSquaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizLabelSquaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLabelSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
