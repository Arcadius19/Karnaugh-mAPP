import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelSquaresComponent } from './label-squares.component';

describe('LabelSquaresComponent', () => {
  let component: LabelSquaresComponent;
  let fixture: ComponentFixture<LabelSquaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelSquaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
