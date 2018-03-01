import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeFindBestGroupsComponent } from './practice-find-best-groups.component';

describe('PracticeFindBestGroupsComponent', () => {
  let component: PracticeFindBestGroupsComponent;
  let fixture: ComponentFixture<PracticeFindBestGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeFindBestGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeFindBestGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
