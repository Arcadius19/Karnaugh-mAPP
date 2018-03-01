import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExExprToKmapComponent } from './ex-expr-to-kmap.component';

describe('ExExprToKmapComponent', () => {
  let component: ExExprToKmapComponent;
  let fixture: ComponentFixture<ExExprToKmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExExprToKmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExExprToKmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
