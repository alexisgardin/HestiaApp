import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {IssueService} from "../../../shared/services/issue.service";
import {FormControl} from "@angular/forms";
import {InhabitantService} from "../../../shared/services/inhabitant.service";
import {SearchBarPipe} from "./search-bar.pipe";
import {TypeService} from "../../../shared/services/type.service";
import {TypeModel} from "../../../shared/models/TypeModel";
import {StateService} from "../../../shared/services/state.service";
import {StateModel} from "../../../shared/models/StateModel";
import {PriorityModel} from "../../../shared/models/PriorityModel";
import {PriorityService} from "../../../shared/services/priority.service";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {
  searchField: FormControl;
  searchTerm: string;
  filters = [];
  searchPipe = new SearchBarPipe();
  typeList: TypeModel[];
  stateList: StateModel[];
  priorityList: PriorityModel[];
  @Output() refreshEvent = new EventEmitter();

  constructor(private issueService: IssueService, private inhabitant: InhabitantService, private typeService: TypeService,
              private stateService: StateService, private priorityService: PriorityService) {
    this.searchField = new FormControl();
    this.searchField.valueChanges.subscribe(term => {
        this.searchTerm = term;
        this.refreshEvent.emit(null);
      });
    this.typeService.getTypes().subscribe(types => this.typeList = types);
    this.stateService.getStates().subscribe(states => this.stateList = states);
    this.priorityService.getPriorities().subscribe(priorities => this.priorityList = priorities);
  }

  ngOnInit() {
  }

  onSwitchCheckbox(event) {
    if (event.target) {
      if (event.target.checked) {
        this.filters.push(event.target.id.toString());
        this.filters = this.filters.filter(obj => obj === obj); // this line is for the update of the array
      } else {
        this.filters = this.filters.filter(obj => obj !== event.target.id);
      }
    }
    console.log(this.filters);
    this.refreshEvent.emit(null);
  }

  showAll() {
    this.issueService.getIssues();
    this.refreshEvent.emit(null);
  }

  showDeclared() {
    this.inhabitant.currentMember$.subscribe(member => {
      this.issueService.getIssuesOfMember(member.id);
      this.refreshEvent.emit(null);
    });
  }

  showAssigned() {
    this.inhabitant.currentMember$.subscribe(member => {
      this.issueService.getAssignedIssuesOfMember(member.id);
      this.refreshEvent.emit(null);
    });
  }
}
