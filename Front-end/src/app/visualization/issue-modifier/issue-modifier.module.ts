import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IssueModifierComponent} from "./issue-modifier.component";
import {MaterializeModule} from "angular2-materialize";
import {FormsModule} from "@angular/forms";
import {AssignedMembersModule} from "./assigned-members/assigned-members.module";
import {MatDialogModule, MatSelectModule} from "@angular/material";
import {ImageUploadModule} from "angular2-image-upload";


@NgModule({
  declarations: [IssueModifierComponent],
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    AssignedMembersModule,
    MatDialogModule,
    ImageUploadModule.forRoot()
  ],
  exports: [IssueModifierComponent],
  providers: [],
  entryComponents: [IssueModifierComponent]
})
export class IssueModifierModule {
}
