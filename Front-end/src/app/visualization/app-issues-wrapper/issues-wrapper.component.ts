import {Component, OnInit, ViewChild} from "@angular/core";
import {IssueService} from "../../../shared/services/issue.service";
import "rxjs/add/operator/distinctUntilChanged";
import {IssuesTableComponent} from "../issues-table/issues-table.component";

@Component({
  selector: 'app-issues-wrapper',
  templateUrl: './issues-wrapper.component.html',
  styleUrls: ['./issues-wrapper.component.css']
})
export class IssuesWrapperComponent implements OnInit {

  @ViewChild(IssuesTableComponent) issuesTable;

  displayList = false;

  constructor(private issueService: IssueService) {
  }

  ngOnInit() {
    this.issueService.getIssues();
  }

  switchDisplay(newDisplayList: boolean): void {
    this.displayList = newDisplayList;
    this.issueService.issuesList$.distinctUntilChanged().subscribe(() => this.issuesTable.refresh());
  }
}
