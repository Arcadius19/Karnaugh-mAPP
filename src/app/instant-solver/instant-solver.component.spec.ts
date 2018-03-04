import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantSolverComponent } from './instant-solver.component';

describe('InstantSolverComponent', () => {
  let component: InstantSolverComponent;
  let fixture: ComponentFixture<InstantSolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantSolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
