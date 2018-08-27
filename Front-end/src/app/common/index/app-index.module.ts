import {HomeIndexComponent} from "./app-index.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FooterModule} from "../footer/app-footer.module";
import {NavBarModule} from "../navbar/nav-bar.module";
import {WeatherModule} from "./weather";
import {NumberCardDashboardModule} from "./charts/number-card/number-card-dashboard.module";
import {LeaderBoardModule} from "./charts/leaderboard/leader-board.module";
import {MostRecentIssuesModule} from "./charts/most-recent-issues";
import {PieChartIssuesTypesModule} from "./charts/pie-chart/pie-chart-issues-types.module";
import {StackedVerticalBarModule} from "./charts/stacked-vertical-bar/stacked-vertical-bar.module";

@NgModule({
  declarations: [HomeIndexComponent],
  imports: [CommonModule,
    FooterModule, NavBarModule, WeatherModule, NumberCardDashboardModule, LeaderBoardModule, MostRecentIssuesModule, PieChartIssuesTypesModule, StackedVerticalBarModule],
  exports: [HomeIndexComponent],
  providers: [],
})
export class HomeIndexModule {
}
