import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeFilterComponent } from './eye-filter.component';

describe('EyeFilterComponent', () => {
  let component: EyeFilterComponent;
  let fixture: ComponentFixture<EyeFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EyeFilterComponent]
    });
    fixture = TestBed.createComponent(EyeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
