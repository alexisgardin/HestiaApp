import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHouseComponent } from './manage-house.component';

describe('ManageHouseComponent', () => {
  let component: ManageHouseComponent;
  let fixture: ComponentFixture<ManageHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
