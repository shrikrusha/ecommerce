import { Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BreadcumbsComponent } from '../../../../shared/components/breadcumbs/breadcumbs.component';
import { IconModule } from '../../../../shared/icon.module';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};


@Component({
  selector: 'app-seller-dashboard-content',
  standalone: true,
  imports: [BreadcumbsComponent,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule,IconModule],
  templateUrl: './seller-dashboard-content.component.html',
  styleUrl: './seller-dashboard-content.component.scss'
})
export class SellerDashboardContentComponent {
  selectedValue:string="Today"
  breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '' },
    // { label: 'Products', path: '/products' }
  ];
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Reviewed",
          data: [5, 10, 15, 30, 15, 10, 5]
        }
      ],
      chart: {
        height: 150,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "20%",
          borderRadius:3,
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["M"],
          ["T"],
          ["W"],
          ["T"],
          ["F"],
          ["S"],
          ["S"]
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };
  }
}
