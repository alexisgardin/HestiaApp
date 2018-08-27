import {InhabitantModifierModule} from "../inhabitant-modifier";
import {MaterializeModule} from "angular2-materialize";
import {InhabitantComponent} from "./app-inhabitant.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CapitalizePipe} from "../../../../shared/utils/capitalize";

@NgModule({
  declarations: [InhabitantComponent, CapitalizePipe],
  imports: [CommonModule, MaterializeModule, InhabitantModifierModule, RouterModule],
  exports: [InhabitantComponent],
  providers: [],
})
export class InhabitantModule {
}
