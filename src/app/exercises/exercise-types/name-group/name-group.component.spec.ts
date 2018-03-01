import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameGroupComponent } from './name-group.component';

describe('NameGroupComponent', () => {
  let component: NameGroupComponent;
  let fixture: ComponentFixture<NameGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
