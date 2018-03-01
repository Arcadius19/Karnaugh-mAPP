import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExKmapToExprComponent } from './ex-kmap-to-expr.component';

describe('ExKmapToExprComponent', () => {
  let component: ExKmapToExprComponent;
  let fixture: ComponentFixture<ExKmapToExprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExKmapToExprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExKmapToExprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
