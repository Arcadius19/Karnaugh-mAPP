import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExNameGroupComponent } from './ex-name-group.component';

describe('ExNameGroupComponent', () => {
  let component: ExNameGroupComponent;
  let fixture: ComponentFixture<ExNameGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExNameGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExNameGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
