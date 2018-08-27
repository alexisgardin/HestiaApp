import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IssueService} from "../../../../../shared/services/issue.service";
import * as Chart from 'chart.js'


@Component({
  selector: 'app-stacked-vertical-bar',
  templateUrl: './stacked-vertical-bar.component.html',
  styleUrls: ['./stacked-vertical-bar.component.css']
})
export class StackedVerticalBarComponent implements OnInit, AfterViewInit {
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

  private insertInTable(table: any[], issue): any[] {
    let index = table.findIndex(value => value.name == issue.type.name);
    if (index == -1) {
      table.push({
        "name": issue.type.name,
        "value": 1
      })
    } else {
      table[index].value += 1;
    }
    return table;
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('pie-chart');
    let ctx = document.getElementById("stacked-bar-chart");
    let stackchart;
    let location: String[] = [];
    let type: Map<String, number[]> = new Map<String, number[]>();
    let data = [];
    this.issueService.issuesList$.subscribe(values => {
      values.forEach(value => {
        if (!location.find(loc => loc == value.location.name)) {
          location.push(value.location.name);
        }
        if (!type.has(value.type.name)) {
          type.set(value.type.name, []);
        }
      });
      type.forEach((value, key) => {
        location.forEach(loc => {
          console.log(key + " " + loc);
          value.push(values.filter(issue => issue.type.name == key && issue.location.name == loc).length);
        })
      });
      let cmpt=0;
      type.forEach((value, key) => {
        cmpt++;
        data.push({
          label: key,
          data: value,
          backgroundColor: this.color[cmpt],
          borderWidth: 1,
          hoverBorderColor: "#eee"
        })
      });
      stackchart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: location,
          datasets: data
        },
        options: {
          title: {
            display: true,
            text: 'Incident par localisation'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      })
    });
  }


}

/*{
          label: '# of attendance in provinces',
          data: [7, 0, 1, 1],
          fill: true,
          backgroundColor: ['rgba(2, 132, 239, .39)', 'rgba(2, 132, 239, .39)', 'rgba(2, 132, 239, .39)', 'rgba(2, 132, 239, .39)',],
          borderColor: ['rgba(2, 132, 239, .89)'],
          borderWidth: 1
        },
          {
            label: '# of citizens in provinces',
            data: [10, 0, 1, 1],
            backgroundColor: ['rgba(0, 0, 000, .09)', 'rgba(0, 0, 000, .09)', 'rgba(0, 0, 000, .09)', 'rgba(0, 0, 000, .09)',],
          }*/
