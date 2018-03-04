import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizNameGroupComponent } from './quiz-name-group.component';

describe('QuizNameGroupComponent', () => {
  let component: QuizNameGroupComponent;
  let fixture: ComponentFixture<QuizNameGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizNameGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizNameGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
