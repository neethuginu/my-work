import { Component, OnInit } from '@angular/core';
import { CompanyappsService } from '../companyapps.service';
// import moment from 'moment';

@Component({
  selector: 'app-license-manage-widget',
  templateUrl: './license-manage-widget.component.html',
  styleUrls: ['./license-manage-widget.component.scss']
})
export class LicenseManageWidgetComponent implements OnInit {

  totalApplication: number[] = [];
  maxDate: any[] = [];
  lastRenew: any;
  dataset: any[] = [];
  activeUser: any;
  platformExpiry: any;

  constructor(
    private dataService: CompanyappsService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  // let moments = this.state.dates.map(d => moment(d)),
  // maxDate = moment.max(moments)
  getData() {
    this.dataService.getAllData().subscribe((res: any) => {
    this.dataset = res;
    this.totalApplication = res.length;
    this.lastRenew = this.dataset.reduce((a, b) => (a.from > b.from ? a : b)).from;
    this.platformExpiry = this.dataset.reduce((a, b) => (a.expiry > b.expiry ? a : b)).expiry;
    this.activeUser = this.dataset.filter((item: any) => item.approved === true).length;
    });


  }

}
