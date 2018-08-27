import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {InhabitantService} from "../../../../shared/services/inhabitant.service";
import {IssueModel} from "../../../../shared/models/IssueModel";
import {IssueService} from "../../../../shared/services/issue.service";

@Component({
  selector: "app-assigned-members",
  templateUrl: "./assigned-members.component.html",
  styleUrls: ["./assigned-members.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AssignedMembersComponent implements OnInit {

  @Input() issueElement: IssueModel;
  inhabitantList = [];
  selectedItems = [];
  removeList = [];
  settings = {};

  constructor(private inhabitantService: InhabitantService, private issueService: IssueService) {
  }

  ngOnInit() {
    const values = this.issueElement.thirdParties.map(issue => {
      return {
        id: issue.id,
        itemName: issue.firstname + ' ' + issue.lastname
      };
    });
    this.selectedItems = values;
    this.removeList = [...values];
    this.inhabitantService.getMembersForAssigned().subscribe(value => this.inhabitantList = value);

    this.settings = {
      singleSelection: false,
      text: "Sélectionner un ou des membres",
      selectAllText: "Tout sélectionner",
      unSelectAllText: "Tout désélectionner",
      enableSearchFilter: true,
      badgeShowLimit: 3
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  OnItemDeSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onDeSelectAll(items: any) {
    console.log(items);
  }

  public deleteRemoveList() {
    this.removeList = this.removeList.filter(value => {
      return !this.selectedItems.includes(value);
    });
    this.removeList.forEach(remove => this.issueService.deleteIssueMember(this.issueElement.id, remove));
  }
}
