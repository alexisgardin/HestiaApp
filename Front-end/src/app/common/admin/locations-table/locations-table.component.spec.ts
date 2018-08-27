import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {LocationsTableComponent} from "./locations-table.component";

describe('LocationsTableComponent', () => {
  let component: LocationsTableComponent;
  let fixture: ComponentFixture<LocationsTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
