import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterializeModule} from "angular2-materialize";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material";
import {ParticlesModule} from "angular-particle";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ConnectComponent} from "./connect.component";

@NgModule({
  imports: [CommonModule, MaterializeModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatStepperModule, MatFormFieldModule, MatInputModule, ParticlesModule, MatProgressSpinnerModule],
  exports: [ConnectComponent],
  declarations: [ConnectComponent],
  providers: [],
})
export class ConnectModule {
}
