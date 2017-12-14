import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFeatureComponent } from './get-feature.component';

describe('GetFeatureComponent', () => {
  let component: GetFeatureComponent;
  let fixture: ComponentFixture<GetFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
