import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeMinimizeExprComponent } from './practice-minimize-expr.component';

describe('PracticeMinimizeExprComponent', () => {
  let component: PracticeMinimizeExprComponent;
  let fixture: ComponentFixture<PracticeMinimizeExprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeMinimizeExprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeMinimizeExprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
