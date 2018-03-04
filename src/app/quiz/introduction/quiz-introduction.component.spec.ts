import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizIntroductionComponent } from './quiz-introduction.component';

describe('QuizIntroductionComponent', () => {
  let component: QuizIntroductionComponent;
  let fixture: ComponentFixture<QuizIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
