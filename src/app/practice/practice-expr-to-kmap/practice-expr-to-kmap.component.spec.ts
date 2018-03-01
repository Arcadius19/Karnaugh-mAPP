import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeExprToKmapComponent } from './practice-expr-to-kmap.component';

describe('PracticeExprToKmapComponent', () => {
  let component: PracticeExprToKmapComponent;
  let fixture: ComponentFixture<PracticeExprToKmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeExprToKmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeExprToKmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
