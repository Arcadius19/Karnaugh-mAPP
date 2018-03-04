import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeKmapToExprComponent } from './practice-kmap-to-expr.component';

describe('PracticeKmapToExprComponent', () => {
  let component: PracticeKmapToExprComponent;
  let fixture: ComponentFixture<PracticeKmapToExprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeKmapToExprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeKmapToExprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
