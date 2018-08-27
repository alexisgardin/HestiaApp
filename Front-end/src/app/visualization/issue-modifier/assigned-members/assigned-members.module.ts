import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {AssignedMembersComponent} from "./assigned-members.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AngularMultiSelectModule,
    FormsModule
  ],
  declarations: [AssignedMembersComponent],
  exports: [AssignedMembersComponent]
})
export class AssignedMembersModule {
}
