
// <!--
// * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
// -->
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularGridInstance, Column, Editors, Formatters, GridOption } from 'angular-slickgrid';

import moment from "moment";
import { CompanyappsService } from '../companyapps.service';

declare const Slick: any;
@Component({
  selector: 'app-company-apps',
  templateUrl: './company-apps.component.html',
  styleUrls: ['./company-apps.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyAppsComponent implements OnInit {

  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  gridOptions!: GridOption;
  dataset: any[] = [];
  gridObj: any;
  slickEventHandler: any;
  expiry: any;
  updatedObject:any;

  // edit
  isAutoEdit = true;
  alertWarning: any;
  id: any;

  constructor(
    private dataService: CompanyappsService,
    // private restApiService: RestApiService
  ) {
    this.slickEventHandler = new Slick.EventHandler();
  }

  ngOnInit(): void {
    this.prepareDataGrid();
    this.getData();
  }

  ngOnDestroy() {
    this.slickEventHandler.unsubscribeAll();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.slickEventHandler.subscribe(this.gridObj.onMouseEnter, (event: Event) => this.highlightRow(event, true));
    this.slickEventHandler.subscribe(this.gridObj.onMouseLeave, (event: Event) => this.highlightRow(event, false));
  }

  highlightRow(event: Event, isMouseEnter: boolean) {
    const cell = this.gridObj.getCellFromEvent(event);
    const rows = isMouseEnter ? [cell.row] : [];
    this.gridObj.setSelectedRows(rows); // highlight current row
    event.preventDefault();
  }

  prepareDataGrid() {
    this.columnDefinitions = [
      {
        id: 'appName', name: 'App Name', field: 'appName',
        minWidth: 100, width: 150,
        cannotTriggerInsert: true,
        resizable: false,
        unselectable: true,
      },
      {
        id: 'itemCode', name: 'Item Code', field: 'itemCode',
        minWidth: 100, width: 150,
        filterable: true,
        sortable: true,
      },
      // {
      //   id: 'itemName', name: 'Item Name', field: 'itemName',
      //   resizable: false,
      //   minWidth: 100, width: 100,
      //   filterable: true,
      //   sortable: true,
      // },
      {
        id: 'itemDescription', name: 'Item Description', field: 'itemDescription',
        resizable: false,
        minWidth: 100, width: 250,
        filterable: true,
        sortable: true,
      },
      {
        id: 'lastRenewed', name: 'Last Renewed', field: 'lastRenewed',
        resizable: false,
        minWidth: 100, width: 150,
        filterable: true,
        sortable: true,
      },
      {
        id: 'expiry', name: 'ExpiryDate', field: 'expiry',
        resizable: false,
        minWidth: 100, width: 150,
        filterable: true,
        sortable: true,
        editor: {
          model: Editors.text,
          required: true,
        },
      },
      {
        id: 'expiryStatus', name: 'Expiry Status', field: 'expiryStatus',
        resizable: false,
        minWidth: 100, width: 150,
        filterable: true,
        sortable: true,
        formatter: Formatters.percentCompleteBar
      },
      {
        id: 'status', name: 'Status', field: 'status',
        resizable: false,
        minWidth: 100, width: 150,
        filterable: true,
        sortable: true,
      },

    ];

    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 10
      },
      enableExcelCopyBuffer: true,
      enableCellNavigation: true,
      editable: true,
      autoEdit: true,
      asyncEditorLoading: true,
      enableColumnReorder: false,
      gridMenu: { hideClearFrozenColumnsCommand: false },
      headerMenu: { hideFreezeColumnsCommand: false }
    };
  }

  getData() {
    this.dataService.getAllData().subscribe((res: any) => {
      const result = res;
      this.updatedObject=res;
      console.log(result)
      const arr: any[] = [];
      for (let i = 0; i < result.length; i++) {
        this.assignExpiryDate(result[i]);
        arr[i] = {
          appName: result[i].itemName,
          itemCode: result[i].itemCode,
          itemDescription: result[i].description,
          lastRenewed: result[i].from,
          expiry: result[i].expiry,
          expiryStatus: status,
          status: result[i].offline,
          id: i + 1,
        }
      }
      this.dataset = arr;
      this.assignExpiryDate(this.dataset)

    })
    
    console.log(this.updatedObject)
  }

  assignExpiryDate(dataset: any) {
    let today = moment().format("DD-MM-YYYY");
    let todayDate = moment(today, 'DD-MM-YYYY');
    let expiryDate = moment(dataset.expiry, 'DD-MM-YYYY');
    let days = (expiryDate.diff(todayDate, 'days'))
    if (days <= 0) {
      status = "20"
    }
    else if (days >= 1 && days <= 7) {
      status = "45"
    }
    else if (days >= 8){
      status = "100"
    }
    console.log(status)
  }

  onActiveCellChanged(event: any, args: any) {
    console.log(event)
    console.log(args)
  }

  onCellChanged(e: Event, args: any) {
    console.log(e, args);
  
  }

  onCellClicked(e: Event, args: any) {
    const metadata = this.angularGrid.gridService.getColumnFromEventArguments(args);
    console.log(metadata);
    console.log(e);
   
  }

  isNullUndefinedOrEmpty(data: any) {
    return (data === '' || data === null || data === undefined);
  }

  onValidationError(_e: Event, args: any) {
    alert(args.validationResults.msg);
  }
}













