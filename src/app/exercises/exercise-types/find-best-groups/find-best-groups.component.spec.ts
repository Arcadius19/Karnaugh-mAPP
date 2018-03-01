import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBestGroupsComponent } from './find-best-groups.component';

describe('FindBestGroupsComponent', () => {
  let component: FindBestGroupsComponent;
  let fixture: ComponentFixture<FindBestGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBestGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBestGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
