import {PasswordGenerator} from "../../../../shared/utils/password.generator";
import {InhabitantModel} from "../../../../shared/models/InhabitantModel";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {InhabitantService} from "../../../../shared/services/inhabitant.service";

@Component({
  selector: "app-inhabitant-modifier",
  templateUrl: "./app-inhabitant-modifier.component.html",
  styleUrls: ["./app-inhabitant-modifier.component.css"]
})
export class InhabitantModifierComponent implements OnInit {

  @Input() inhabitant: InhabitantModel;
  @Output() closeEvent = new EventEmitter();

  nameInputValue: string;
  firstNameInputValue: string;
  emailInputValue: string;
  fileInputValue: File;

  constructor(readonly inhabitantService: InhabitantService, readonly passwordgenerator: PasswordGenerator) {
  }

  fileUploader(event): void {
    const elem = event.target;
    if (elem.files.length > 0) {
      console.log(elem.files[0]);
      this.fileInputValue = elem.files[0];
    }
  }

  ngOnInit() {
    if (this.inhabitant != null) {
      this.nameInputValue = this.inhabitant.lastname;
      this.firstNameInputValue = this.inhabitant.firstname;
      this.emailInputValue = this.inhabitant.email;
    }
  }

  public validDialog() {
    if (this.inhabitant != null) {
      this.inhabitant.firstname = this.firstNameInputValue;
      this.inhabitant.lastname = this.nameInputValue;
      this.inhabitant.email = this.emailInputValue;
      this.inhabitantService.patchMember(this.inhabitant);

      this.closeEvent.emit("close-dialog");
    } else {
      const password = this.passwordgenerator.generate();
      const newInhabitant = new InhabitantModel(
        null,
        this.nameInputValue,
        this.firstNameInputValue,
        null,
        null,
        this.emailInputValue,
        null,
        null,
        password
      );

      this.inhabitantService.postMember(newInhabitant);
      this.closeEvent.emit("close-dialog");
    }
  }

  closeDialog(): any {
    this.closeEvent.emit("close-dialog");
  }
}
