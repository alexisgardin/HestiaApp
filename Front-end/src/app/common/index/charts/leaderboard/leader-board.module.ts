import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeaderBoardComponent} from "./leader-board.component";
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {LeaderBoardOneMonthComponent} from "./table-month/leader-board-month.component";
import {LeaderBoardOneYearComponent} from "./table-year/leader-board-year.component";
import {LeaderBoardAllTimeComponent} from "./table-all-time/leader-board-alltime.component";
import {MatPaginatorModule, MatTabsModule} from "@angular/material";

@NgModule({
  declarations: [LeaderBoardComponent, LeaderBoardOneMonthComponent, LeaderBoardOneYearComponent, LeaderBoardAllTimeComponent],
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatTabsModule ],
  exports: [LeaderBoardComponent],
  providers: [],
})
export class LeaderBoardModule {
}
