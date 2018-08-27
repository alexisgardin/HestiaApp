import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfilePageComponent} from "./profile-page.component";
import {MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule} from "@angular/material";
import {ImageUploadModule} from "angular2-image-upload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterializeModule} from "angular2-materialize";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ImageUploadModule,
    MatFormFieldModule,
    MatInputModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ProfilePageComponent],
  declarations: [ProfilePageComponent]
})

export class ProfilePageModule {
}
