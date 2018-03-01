import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KmapComponent } from './kmap.component';

describe('KmapComponent', () => {
  let component: KmapComponent;
  let fixture: ComponentFixture<KmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
