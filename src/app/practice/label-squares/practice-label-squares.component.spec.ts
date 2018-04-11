import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeLabelSquaresComponent } from './practice-label-squares.component';

describe('PracticeLabelSquaresComponent', () => {
  let component: PracticeLabelSquaresComponent;
  let fixture: ComponentFixture<PracticeLabelSquaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeLabelSquaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeLabelSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
