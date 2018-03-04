import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeIntroductionComponent } from './practice-introduction.component';

describe('PracticeIntroductionComponent', () => {
  let component: PracticeIntroductionComponent;
  let fixture: ComponentFixture<PracticeIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
