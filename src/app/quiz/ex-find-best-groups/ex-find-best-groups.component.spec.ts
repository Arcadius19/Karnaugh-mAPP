import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExFindBestGroupsComponent } from './ex-find-best-groups.component';

describe('ExFindBestGroupsComponent', () => {
  let component: ExFindBestGroupsComponent;
  let fixture: ComponentFixture<ExFindBestGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExFindBestGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExFindBestGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
