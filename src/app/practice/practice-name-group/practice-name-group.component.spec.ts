import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeNameGroupComponent } from './practice-name-group.component';

describe('PracticeNameGroupComponent', () => {
  let component: PracticeNameGroupComponent;
  let fixture: ComponentFixture<PracticeNameGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeNameGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeNameGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
