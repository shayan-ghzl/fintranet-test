import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeFilterComponent } from './age-filter.component';

describe('AgeFilterComponent', () => {
  let component: AgeFilterComponent;
  let fixture: ComponentFixture<AgeFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgeFilterComponent]
    });
    fixture = TestBed.createComponent(AgeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
