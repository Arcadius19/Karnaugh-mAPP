import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KmapToExprComponent } from './kmap-to-expr.component';

describe('KmapToExprComponent', () => {
  let component: KmapToExprComponent;
  let fixture: ComponentFixture<KmapToExprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KmapToExprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KmapToExprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
