import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueService } from '../../../../../shared/services/issue.service';
import { Issue } from '../../../../../shared/models/IssueModel';
import { Observable } from "rxjs/Observable";
import { MostRecentIssueElementComponent } from './most-recent-issue-element';
import {AppIssueDetailVisualizerComponent} from "../../../../visualization/app-issue-detail-visualizer";
import {MatDialog} from "@angular/material";


@Component({
    selector: 'app-most-recent-issues',
    templateUrl: './app-most-recent-issues.component.html',
    styleUrls: ['./app-most-recent-issues.component.css']

})
export class MostRecentIssuesComponent implements OnInit {

    public issues: Observable<Issue[]>;
    public numberOfIssues = 3;

    constructor(private issueService: IssueService) { }

    ngOnInit(): void {
       this.issues = this.issueService.getLastIssues(this.numberOfIssues);
    }

    /**
     * openModal
     */
    public openModal() {
        // todo opens modal of detailed issue
    }
}
