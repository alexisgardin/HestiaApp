import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IssueModifierComponent} from './issue-modifier.component';

describe('IssueModifierComponent', () => {
  let component: IssueModifierComponent;
  let fixture: ComponentFixture<IssueModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
