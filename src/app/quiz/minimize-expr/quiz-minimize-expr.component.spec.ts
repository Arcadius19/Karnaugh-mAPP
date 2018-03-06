import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMinimizeExprComponent } from './quiz-minimize-expr.component';

describe('QuizMinimizeExprComponent', () => {
  let component: QuizMinimizeExprComponent;
  let fixture: ComponentFixture<QuizMinimizeExprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizMinimizeExprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizMinimizeExprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
