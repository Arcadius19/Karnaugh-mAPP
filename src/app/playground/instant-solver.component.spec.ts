import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldInstantSolverComponent } from './instant-solver.component';

describe('OldInstantSolverComponent', () => {
  let component: OldInstantSolverComponent;
  let fixture: ComponentFixture<OldInstantSolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldInstantSolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldInstantSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
