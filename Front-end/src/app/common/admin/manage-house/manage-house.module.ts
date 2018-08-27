import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageHouseComponent} from './manage-house.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule
  ],
  exports: [ManageHouseComponent],
  declarations: [ManageHouseComponent]
})
export class ManageHouseModule {
}
