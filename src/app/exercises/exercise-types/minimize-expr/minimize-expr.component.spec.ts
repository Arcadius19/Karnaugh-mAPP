import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimizeExprComponent } from './minimize-expr.component';

describe('MinimizeExprComponent', () => {
  let component: MinimizeExprComponent;
  let fixture: ComponentFixture<MinimizeExprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimizeExprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimizeExprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
