import { AfterViewInit, Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import { DataService } from '../data.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent, BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements AfterViewInit {
  public dataSource = {
    datasets: [
      {
        data: [30, 350, 90],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#ff0000',
          '#007f00',
          '#280028',
        ],
      },
    ],
    labels: ['Eat Out', 'Rent', 'Groceries'],
  };

  constructor(private http: HttpClient, private dataService: DataService) {}

  ngAfterViewInit(): void {
    if (this.dataService.getBudgetData().length === 0) {
      this.dataService.fetchBudgetData().subscribe((res: any) => {
        const budgetChartData = res.Aishwarya_Budget;

        this.dataService.setBudgetData(budgetChartData);

        this.dataSource.datasets[0].data = this.dataService.getBudgetData().map(data => data.budget);
        this.dataSource.labels = this.dataService.getBudgetData().map(data => data.title);

        this.createChart();
        this.createD3JSChart(budgetChartData);
      });
    } else {
      const budgetChartData = this.dataService.getBudgetData();

      this.dataSource.datasets[0].data = budgetChartData.map(data => data.budget);
      this.dataSource.labels = budgetChartData.map(data => data.title);

      this.createChart();
      this.createD3JSChart(budgetChartData);
    }
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }

  createD3JSChart(data: any[]) {
    const valuesofBudget = data.map((d: any) => d.budget);
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select('#D3donutchart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal<string, string>()
      .domain(data.map((d: any) => d.title))
      .range([
        '#ff4c4c',
        '#ff6666',
        '#ff7f7f',
        '#ff9999',
        '#ffb2b2',
        '#ffcccc',
        '#ffe5e5',
      ]);

    const pie = d3
      .pie<number>()
      .sort(null)
      .value((d, i) => valuesofBudget[i]);

    const arc = d3
      .arc<any, d3.DefaultArcObject>()
      .outerRadius(radius * 0.9)
      .innerRadius(radius * 0.5);

    const outerArc = d3
      .arc<any, d3.DefaultArcObject>()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const arcs = svg
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', (d: any) => {
        if (typeof d === 'object' && 'startAngle' in d && 'endAngle' in d) {
          return arc(d);
        }
        return '';
      })
      .style('fill', (d: any) => color(d.data.title))
      .attr('class', 'slice');

    const text = svg
      .selectAll('.labels')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('dy', '.35em')
      .text(function (d: any) {
        return d.data.title;
      });

    function midAngle(d: { startAngle: number; endAngle: number }) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text
      .transition()
      .duration(1000)
      .attr('transform', function (d: any) {
        const pos = outerArc.centroid(d);
        pos[0] = radius * 0.77 * (midAngle(d) < Math.PI ? 1 : -1);
        return `translate(${pos[0]},${pos[1]})`;
      })
      .style('text-anchor', function (d: any) {
        return midAngle(d) < Math.PI ? 'start' : 'end';
      });

    const polyline = svg
      .selectAll('.lines')
      .data(pie(data))
      .enter()
      .append('polyline');

    polyline
      .transition()
      .duration(1000)
      .attr('points', function (d: any) {
        const pos = outerArc.centroid(d);
        pos[0] = radius * 0.7 * (midAngle(d) < Math.PI ? 1 : -1);
        return `${arc.centroid(d)},${outerArc.centroid(d)},${pos[0]},${pos[1]}`;
      });
  }
}
