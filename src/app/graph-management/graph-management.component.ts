import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-management',
  templateUrl: './graph-management.component.html',
  styleUrls: ['./graph-management.component.css']
})
export class GraphManagementComponent implements OnInit {
  dataSource: Object;
  title: string;
  dataSource1: Object;
  dataSource2: Object;
  constructor() { }

  ngOnInit() {
    this.dataSource = {
      chart: {
        caption: 'Total Own Earning',
        subCaption: 'Earning From Normal User, Delivery Worker & Professional Worker',
        xAxisName: 'Period',
        yAxisName: 'Earning (k)',
        numberSuffix: 'K',
        theme: 'fusion'
      },
      data: [
        { label: 'Yearly', value: '700' },
        { label: 'Monthly', value: '500' },
        { label: 'Weekly', value: '180' },
    
      ]
    };
    this.dataSource1 = {
      chart: {
        caption: 'Total Delivery Worker Earning',
        subCaption: 'Include All Delivery Worker Earning',
        xAxisName: 'Period',
        yAxisName: 'Earning (k)',
        numberSuffix: 'K',
        theme: 'fusion'
      },
      data: [
        { label: 'Yearly', value: '500' },
        { label: 'Monthly', value: '360' },
        { label: 'Weekly', value: '200' },
    
      ]
    };
    this.dataSource2 = {
      chart: {
        caption: 'Total Professional Worker Earning',
        subCaption: 'Include All Professional Worker Earning',
        xAxisName: 'Period',
        yAxisName: 'Earning (k)',
        numberSuffix: 'K',
        theme: 'fusion'
      },
      data: [
        { label: 'Yearly', value: '900' },
        { label: 'Monthly', value: '660' },
        { label: 'Weekly', value: '90' },
    
      ]
    };
  }
  plotRollOver($event){
    var dataValue = $event.dataObj.dataValue;
    console.log(`Value is ${dataValue}`);
  }

}
