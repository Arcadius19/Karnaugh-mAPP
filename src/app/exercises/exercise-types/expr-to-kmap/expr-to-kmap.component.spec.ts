import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprToKmapComponent } from './expr-to-kmap.component';

describe('ExprToKmapComponent', () => {
  let component: ExprToKmapComponent;
  let fixture: ComponentFixture<ExprToKmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExprToKmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprToKmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
