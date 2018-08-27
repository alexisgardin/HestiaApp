import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedVerticalBarComponent } from './stacked-vertical-bar.component';

describe('StackedVerticalBarComponent', () => {
  let component: StackedVerticalBarComponent;
  let fixture: ComponentFixture<StackedVerticalBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedVerticalBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedVerticalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
