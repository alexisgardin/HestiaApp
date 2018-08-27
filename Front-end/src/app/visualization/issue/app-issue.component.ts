import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {IssueModel} from '../../../shared/models/IssueModel';
import {MaterializeAction} from "angular2-materialize";
import {AppIssueDetailVisualizerComponent} from "../app-issue-detail-visualizer";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {IssueModifierComponent} from "../issue-modifier/issue-modifier.component";
import {IssueService} from "../../../shared/services/issue.service";

@Component({
    selector: 'app-issue',
    templateUrl: './app-issue.component.html',
    styleUrls: ['./app-issue.component.css']
})
export class IssueComponent {

    @Input() issueElement: IssueModel;

    issueDetails = new EventEmitter<string | MaterializeAction>();
    issueModification = new EventEmitter<string | MaterializeAction>();

    constructor(public dialog: MatDialog, private issueService: IssueService) {
    }

    openModifyIssueModal(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.issueElement;
        dialogConfig.height = "80%";
        dialogConfig.width = "50%";

        let dialogRef = this.dialog.open(IssueModifierComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.issueService.getIssues();
        });
    }

    closeModal(): void {
        this.issueDetails.emit({action: "modal", params: ["close"]});
        this.issueModification.emit({action: "modal", params: ["close"]});
    }

    viewIssueDetails(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = false;
        dialogConfig.data = this.issueElement;
        dialogConfig.height = "80%";
        dialogConfig.width = "40%";

        let dialogRef = this.dialog.open(AppIssueDetailVisualizerComponent, dialogConfig);
    }
}
