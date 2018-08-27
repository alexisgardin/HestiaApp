import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IssuesWrapperComponent} from './issues-wrapper.component';

describe('IssuesWrapperComponent', () => {
  let component: IssuesWrapperComponent;
  let fixture: ComponentFixture<IssuesWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
