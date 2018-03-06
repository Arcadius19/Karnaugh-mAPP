import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveKmapComponent } from './interactive-kmap.component';

describe('InteractiveKmapComponent', () => {
  let component: InteractiveKmapComponent;
  let fixture: ComponentFixture<InteractiveKmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveKmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveKmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
