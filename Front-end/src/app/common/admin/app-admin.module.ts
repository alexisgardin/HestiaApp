import {SearchBarModule} from "./search-bar";
import {AdminComponent} from "./app-admin.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InhabitantsModule} from "./inhabitants";
import {FooterModule} from "../footer/app-footer.module";
import {NavBarModule} from "../navbar/nav-bar.module";
import {AppRoutingModule} from "../../app-routing.module";
import {InlineEditDialog} from "./inline-edit-dialog/inline-edit-dialog.component";
import {MatButtonModule, MatInputModule} from "@angular/material";

@NgModule({
  declarations: [AdminComponent, InlineEditDialog],
  imports: [
    CommonModule,
    InhabitantsModule,
    SearchBarModule,
    FooterModule,
    NavBarModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [AdminComponent],
  providers: [],
  entryComponents: [InlineEditDialog]
})
export class AdminModule {
}
