import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SearchBarComponent} from "./search-bar.component";
import {MaterializeModule} from "angular2-materialize";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchBarPipe} from "./search-bar.pipe";

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SearchBarComponent, SearchBarPipe],
  declarations: [SearchBarComponent, SearchBarPipe]
})
export class SearchBarModule {
}
