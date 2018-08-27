import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {IssueModel} from '../../../../../../shared/models/IssueModel';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MaterializeAction} from "angular2-materialize";
import {AppIssueDetailVisualizerComponent} from "../../../../../visualization/app-issue-detail-visualizer";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {IssueModifierComponent} from "../../../../../visualization/issue-modifier/issue-modifier.component";

@Component({
  selector: 'app-most-recent-issue-element',
  templateUrl: './app-most-recent-issue-element.component.html',
  styleUrls: ['./app-most-recent-issue-element.component.css'],
  animations: [
    trigger('hoverAnimation', [
      state('show', style({
        transform: 'translateX(0)'
      })),
      state('hide', style({
        transform: 'translateX(25%)'
      })),
      state('init', style({})),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('600ms ease-in')),
      transition('init => hide', animate('600ms ease-out'))
    ]),
    trigger('fadeOut', [
      state('hide', style({opacity: 1})),
      state('show', style({opacity: 0})),
      state('init', style({opacity: 0})),
      transition('hide => show', animate('2000ms ease-out'))
    ])
  ]
})
export class MostRecentIssueElementComponent implements OnInit {

  @Input() public issue: IssueModel;
  public show = 'init';
  issueDetails = new EventEmitter<string | MaterializeAction>();
  issueModification = new EventEmitter<string | MaterializeAction>();

  constructor(public dialog: MatDialog) {
  }

  get hovered() {
    return this.show;
  }

  ngOnInit(): void {
  }

  /**
   * getIcon
   */
  public getIcon(value: number): string | any {
    switch (value) {
      case 1:
        return "check";
      case 0:
        return "cached";
      case -1:
        return "error_outline";
    }

  }

  /**
   * show
   */
  public showInfo() {
    this.show = 'hide';
  }

  /**
   * hide
   */
  hideInfo() {
    this.show = 'show';
  }

  /**
   * displayIssueInfo
   */
  public displayIssueInfo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.issue;
    dialogConfig.height = "80%";
    dialogConfig.width = "40%";

    let dialogRef = this.dialog.open(AppIssueDetailVisualizerComponent, dialogConfig);
  }

  /**
   * displayIssueModification
   */
  public displayIssueModification() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.issue;
    dialogConfig.height = "80%";
    dialogConfig.width = "50%";

    let dialogRef = this.dialog.open(IssueModifierComponent, dialogConfig);
  }


  closeModal(): void {
    this.issueDetails.emit({action: "modal", params: ["close"]});
    this.issueModification.emit({action: "modal", params: ["close"]});
  }
}
