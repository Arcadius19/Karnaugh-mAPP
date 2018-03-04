import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFindBestGroupsComponent } from './quiz-find-best-groups.component';

describe('QuizFindBestGroupsComponent', () => {
  let component: QuizFindBestGroupsComponent;
  let fixture: ComponentFixture<QuizFindBestGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizFindBestGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizFindBestGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
