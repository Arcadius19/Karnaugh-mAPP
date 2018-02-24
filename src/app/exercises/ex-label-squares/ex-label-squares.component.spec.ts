import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExLabelSquaresComponent } from './ex-label-squares.component';

describe('ExLabelSquaresComponent', () => {
  let component: ExLabelSquaresComponent;
  let fixture: ComponentFixture<ExLabelSquaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExLabelSquaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExLabelSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
