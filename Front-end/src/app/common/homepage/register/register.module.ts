import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material";
import {ParticlesModule} from "angular-particle";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RegisterComponent} from "./register.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, ParticlesModule, MatProgressSpinnerModule],
  exports: [RegisterComponent],
  declarations: [RegisterComponent],
  providers: [],
})
export class RegisterModule {
}
