import {Component, Inject, OnInit} from "@angular/core";
import * as moment from "moment";
import {Moment} from "moment";
import {IssueService} from "../../../shared/services/issue.service";
import {Observable} from "rxjs/Observable";
import {MAT_DIALOG_DATA} from "@angular/material";
import {Issue} from "../../../shared/models/IssueModel";
import {InhabitantModel} from "../../../shared/models/InhabitantModel";

@Component({
    selector: "app-issue-detail-visualizer",
    templateUrl: "./app-issue-detail-visualizer.component.html",
    styleUrls: ["./app-issue-detail-visualizer.component.css"]
})
export class AppIssueDetailVisualizerComponent implements OnInit {

    assignedMembers: Observable<InhabitantModel[]>;
    issueElement: Issue;

    constructor(@Inject(MAT_DIALOG_DATA) issue: Issue, private issueService: IssueService) {
        this.issueElement = issue;
    }

    ngOnInit() {
        this.assignedMembers = this.issueService.getMembersAssignedToIssue(this.issueElement.id);
    }

    formatDate(date: Moment): string {
        return moment(date).locale('FR').format('L');
    }
}
