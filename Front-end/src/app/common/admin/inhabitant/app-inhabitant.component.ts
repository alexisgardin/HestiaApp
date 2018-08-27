import {MaterializeAction} from "angular2-materialize";
import {InhabitantModel} from "../../../../shared/models/InhabitantModel";
import {Component, EventEmitter, Input, OnInit} from "@angular/core";
import {InhabitantService} from "../../../../shared/services/inhabitant.service";
import {Router} from "@angular/router";
import {CapitalizePipe} from "../../../../shared/utils/capitalize";

@Component({
  selector: "app-inhabitant",
  templateUrl: "./app-inhabitant.component.html",
  styleUrls: ["./app-inhabitant.component.css"]
})
export class InhabitantComponent implements OnInit {

  @Input() inhabitantElement: InhabitantModel;

  modalAddMemberActions = new EventEmitter<string | MaterializeAction>();
  modalSuppressActions = new EventEmitter<string | MaterializeAction>();
  imageProfileId = 0;

  constructor(readonly inhabitantService: InhabitantService, readonly router: Router) {
  }

  ngOnInit() {
    this.inhabitantService.getProfileImage(this.inhabitantElement.id).subscribe(imgProfile => this.imageProfileId = imgProfile.id)
  }


  opentModifyInhabitantModal(): void {
    console.log("modify inhabitant clicked");
    this.modalAddMemberActions.emit({action: "modal", params: ["open"]});
  }

  closeAddMemberModal(): void {
    this.modalAddMemberActions.emit({action: "modal", params: ["close"]});
  }


  public deleteInhabitant(): void {
    this.inhabitantService.deleteMember(this.inhabitantElement.id);
  }
}
