import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KmapTutorialComponent } from './kmap-tutorial.component';

describe('KmapTutorialComponent', () => {
  let component: KmapTutorialComponent;
  let fixture: ComponentFixture<KmapTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KmapTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KmapTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
