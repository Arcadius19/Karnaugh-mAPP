import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExIntroductionComponent } from './ex-introduction.component';

describe('ExIntroductionComponent', () => {
  let component: ExIntroductionComponent;
  let fixture: ComponentFixture<ExIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
