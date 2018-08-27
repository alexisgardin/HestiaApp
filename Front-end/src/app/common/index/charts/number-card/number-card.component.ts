import {Component, OnInit} from '@angular/core';
import {IssueService} from "../../../../../shared/services/issue.service";
import {forkJoin} from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.css']
})
export class NumberCardComponent implements OnInit {
  numberOfUnresolved: number = 0;
  numberInProcess: number = 0;
  numberResolved: number = 0;
  numberLate: number = 0;

  constructor(private issueService: IssueService) {
  }

  ngOnInit() {
    const unresolved = this.issueService.getNumberOfUnresolvedIssue();
    const inProcess = this.issueService.getNumberOfInProcessIssue();
    const resolved = this.issueService.getNumberOfResolvedIssue();
    const late = this.issueService.getNumberOfLateIssue();
    forkJoin(unresolved, inProcess, resolved, late).subscribe(value => {
      this.numberOfUnresolved = (<any>value[0]).count;
      this.numberInProcess = (<any>value[1]).count;
      this.numberResolved = (<any>value[2]).count;
      this.numberLate = (<any>value[3]).count;
    });
  }
}
