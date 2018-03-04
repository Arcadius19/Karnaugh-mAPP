import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizKmapToExprComponent } from './quiz-kmap-to-expr.component';

describe('QuizKmapToExprComponent', () => {
  let component: QuizKmapToExprComponent;
  let fixture: ComponentFixture<QuizKmapToExprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizKmapToExprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizKmapToExprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
