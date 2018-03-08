import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPictureComponent } from './student-picture.component';

describe('StudentPictureComponent', () => {
  let component: StudentPictureComponent;
  let fixture: ComponentFixture<StudentPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
