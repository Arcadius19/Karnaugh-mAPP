import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizExprToKmapComponent } from './quiz-expr-to-kmap.component';

describe('QuizExprToKmapComponent', () => {
  let component: QuizExprToKmapComponent;
  let fixture: ComponentFixture<QuizExprToKmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizExprToKmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizExprToKmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
