import {Component, Input} from "@angular/core";
import {IssueService} from "../../../shared/services/issue.service";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent {

  @Input() searchTerm: string;
  @Input() filters: string[];

  constructor(readonly issueService: IssueService) {
  }
}
