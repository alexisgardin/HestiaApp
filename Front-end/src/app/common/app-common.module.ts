import {SearchBarModule} from "./admin/search-bar";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InhabitantsModule} from "./admin/inhabitants";
import {AppRoutingModule} from "../app-routing.module";
import {FooterModule} from "./footer/app-footer.module";
import {NavBarModule} from "./navbar/nav-bar.module";
import {CommonPageComponent} from "./app-common.component";
import {LeaderBoardModule} from "./index/charts/leaderboard/leader-board.module";

@NgModule({
  declarations: [CommonPageComponent],
  imports: [
    CommonModule,
    InhabitantsModule,
    AppRoutingModule,
    SearchBarModule,
    FooterModule,
    NavBarModule,
    LeaderBoardModule
  ],
  exports: [CommonPageComponent],
  providers: [],
})
export class CommonPageModule {
}
