import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IssueService} from "../../../../../shared/services/issue.service";
import * as Chart from 'chart.js'

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, AfterViewInit {
  canvas: any;
  color = ['#bf360c',
    '#d84315',
    '#ff8f00',
    '#f9a825',
    '#1565c0',
    '#1976d2',
    '#ff8f00',
    '#fbc02d',
    '#f9a825',
    '#ffa000',
    '#0277bd',
    '#7cb342',
    '#d84315',
    '#ef6c00',
    '#9c27b0',
    '#03a9f4',
    '#ff8f00',
    '#fbc02d'];

  constructor(readonly issueService: IssueService) {
  }

  ngOnInit() {
    this.issueService.getIssues();
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('pie-chart');
     let ctx = this.canvas.getContext('2d');
    let myChart;
    let myhash = new Map<String, number>();
    this.issueService.issuesList$.subscribe(values => {
      values.forEach(value => {
        if (myhash.get(value.type.name)) {
          myhash.set(value.type.name, myhash.get(value.type.name) + 1)
        } else {
          myhash.set(value.type.name, 1);
        }
      });
      let type = [];
      let data = [];
      console.log(myhash);
      myhash.forEach((value, key) => {
        type.push(key+" ("+((value/values.length)*100).toFixed(2)+"%)");
        data.push(value);
      });
      myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: type,
          datasets: [{
            label: '# of Votes',
            data: data,
            backgroundColor: this.color,
            borderWidth: 1,
            hoverBorderColor: [
              "#eee","#eee","#eee"
            ]
          }]
        },
        options: {
          responsive: true,
          display: true,
          cutoutPercentage:50
        }
      });
    });
  }
}
