import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {Issue, IssueModel} from "../../../shared/models/IssueModel";
import {IssueService} from "../../../shared/services/issue.service";
import {StateService} from "../../../shared/services/state.service";
import {LocationModel} from "../../../shared/models/LocationModel";
import {PriorityModel} from "../../../shared/models/PriorityModel";
import {TypeModel} from "../../../shared/models/TypeModel";
import {LocationService} from "../../../shared/services/location.service";
import {TypeService} from "../../../shared/services/type.service";
import {PriorityService} from "../../../shared/services/priority.service";
import {AssignedMembersComponent} from "./assigned-members/assigned-members.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {StateModel} from "../../../shared/models/StateModel";
import {FileUploadService} from "../../../shared/services/file-upload.service";
import {API_URL} from "../../../shared/services/rest/constants";
import {AuthService} from "../../../shared/services/auth/auth.service";


@Component({
  selector: 'app-issue-modifier',
  templateUrl: './issue-modifier.component.html',
  styleUrls: ['./issue-modifier.component.css']
})
export class IssueModifierComponent implements OnInit {

  issueElement: IssueModel;
  @ViewChild(AssignedMembersComponent) assignedMembers;

  public titleValue: string;
  public descriptionValue: string;
  public locationValue: string;
  public typeValue: string;
  public stateValue: number;

  public locations: LocationModel[];
  public types: TypeModel[];
  public priorities: PriorityModel[];
  public states: StateModel[];

  public images: string[];

  public displayAssign = false;

  constructor(@Inject(MAT_DIALOG_DATA) issue: Issue, private dialogRef: MatDialogRef<IssueModifierComponent>,
              private issueService: IssueService, private stateService: StateService,
              private locationService: LocationService, private typeService: TypeService,
              private priorityService: PriorityService, private uploadService: FileUploadService) {
    this.issueElement = issue;
    this.initializeImages();

    this.locationService.getLocations().subscribe(locations => this.locations = locations);
    this.typeService.getTypes().subscribe(types => this.types = types);
    this.priorityService.getPriorities().subscribe(priorities => this.priorities = priorities);
    this.stateService.getStates().subscribe(states => this.states = states);
  }

  ngOnInit() {
    if (this.issueElement) {
      this.titleValue = this.issueElement.title;
      this.descriptionValue = this.issueElement.description;

      this.locationValue = this.issueElement.location.name;
      this.typeValue = this.issueElement.type.name;
    }
  }

  initializeImages(): void {
    this.images = [];
    this.issueElement.images.forEach(img => {
      if (img.imageableType === "Issue")
        this.images.push(API_URL + "ImageFiles/" + img.id + "/download");
    });
  }

  getUploadUrl() {
    return FileUploadService.getUploadFileIssueUrl(this.issueElement);
  }

  getToken(): string {
    return AuthService.getToken();
  }

  /**
   * Triggered when an image is removed from the image upload component.
   * Removes the image from the server.
   *
   * @param event
   */
  onRemoved(event): void {
    const url: string = event.src;
    console.log(url);
    const imageId: number = parseInt(url.match("ImageFiles\\/([1-9][0-9]*)\\/")[1], 10);
    if (imageId) {
      this.uploadService.deleteFile(imageId).subscribe();
    }
  }

  /**
   * validDialog
   */
  public validDialog(): void {
    if (this.issueElement) {
      this.issueElement.title = this.titleValue != null ? this.titleValue : this.issueElement.title;
      this.issueElement.description = this.descriptionValue != null ? this.descriptionValue : this.issueElement.description;

      this.issueElement.location = this.changeLocationValue();
      this.issueElement.locationId = this.issueElement.location.id;

      this.issueElement.type = this.changeTypeValue();
      this.issueElement.typeId = this.issueElement.type.id;

      this.issueElement.state = this.changeStateValue();
      this.issueElement.stateId = this.issueElement.state.id;

      this.issueService.patchIssue(this.issueElement);
      if (this.assignedMembers) {
        this.assignedMembers.selectedItems.forEach(member => this.issueService.addIssueToMember(this.issueElement.id, member));
        this.assignedMembers.deleteRemoveList();
      }
    }

    this.closeDialog();
  }

  private changeLocationValue(): LocationModel {
    let result = this.issueElement.location;
    this.locations.forEach(location => {
      if (location.value.toString() === this.locationValue) {
        console.log(location);
        console.log(location.id);
        result = location;
      }
    });
    return result;
  }

  private changeTypeValue(): TypeModel {
    let result = this.issueElement.type;
    this.types.forEach(type => {
      if (type.value.toString() === this.typeValue) {
        result = type;
      }
    });
    return result;
  }

  private changeStateValue(): StateModel {
    let result = this.issueElement.state;
    this.states.forEach(state => {
      if (state.value === this.stateValue) {
        result = state;
      }
    });
    return result;
  }

  /**
   * closeDialog
   */
  public closeDialog() {
    this.dialogRef.close();
  }

  public showAssign() {
    this.displayAssign = true;
  }

  public cancelIssue() {
    this.stateValue = -1;
    this.validDialog();
  }

  public closeIssue() {
    this.stateValue = 1;
    this.validDialog();
  }
}
