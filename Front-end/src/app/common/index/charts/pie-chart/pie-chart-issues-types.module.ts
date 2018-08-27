import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PieChartComponent} from "./pie-chart.component";
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PieChartComponent],
  exports: [PieChartComponent]
})
export class PieChartIssuesTypesModule { }
