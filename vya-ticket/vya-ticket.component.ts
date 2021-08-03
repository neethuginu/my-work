
// <!--
// * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
// -->
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularGridInstance, Column, Formatters, GridOption } from 'angular-slickgrid';

import { SlickService } from '../slick.service';

declare const Slick: any;
@Component({
  selector: 'app-vya-ticket',
  templateUrl: './vya-ticket.component.html',
  styleUrls: ['./vya-ticket.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VyaTicketComponent implements OnInit {

  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  gridOptions!: GridOption;
  dataset: any[] = [];
  gridObj: any;
  slickEventHandler: any;

  // edit
  isAutoEdit = true;
  alertWarning: any;
  id: any;

  constructor(
    private dataService: SlickService,
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
        id: 'loginUser', name: 'User', field: 'loginUser',
        minWidth: 100, width: 100,
        cannotTriggerInsert: true,
        resizable: false,
        unselectable: true,
      },
      {
        id: 'dateTime', name: 'Date & Time', field: 'dateTime',
        minWidth: 100, width: 100,
        filterable: true,
        sortable: true,
        formatter: Formatters.dateTimeShortEuro
      },
      {
        id: 'appUrl', name: 'App Url', field: 'appUrl',
        resizable: false,
        minWidth: 100, width: 100,
        filterable: true,
        sortable: true,
      },
      {
        id: 'subject', name: 'Subject', field: 'subject',
        resizable: false,
        minWidth: 100, width: 150,
        filterable: true,
        sortable: true,
      },
      {
        id: 'description', name: 'Description', field: 'description',
        resizable: false,
        minWidth: 100, width: 150,
        filterable: true,
        sortable: true,
      },
      {
        id: 'status', name: 'Status', field: 'status',
        resizable: false,
        minWidth: 100, width: 100,
        filterable: true,
        sortable: true,
        formatter: Formatters.percentCompleteBar
      },
      {
        id: 'completedOn', name: 'Completed On', field: 'completedOn',
        resizable: false,
        minWidth: 100, width: 150,
        filterable: true,
        sortable: true,
      },
      {
        id: 'comment', name: 'Comment', field: 'comment',
        resizable: false,
        minWidth: 100, width: 100,
        filterable: true,
        sortable: true,
      },
      {
        id: 'versionReference', name: 'Version Reference', field: 'versionReference',
        resizable: false,
        minWidth: 100, width: 100,
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
      const result = res.rows;
      const arr: any[] = [];
      for (let i = 0; i < result.length; i++) {
        this.assignStatus(result[i].doc.status)
        arr[i] = {
          loginUser: result[i].doc.loginUser,
          dateTime: result[i].doc.dateTime,
          appUrl: result[i].doc.appUrl,
          subject: result[i].doc.subject,
          description: result[i].doc.description,
          status: status,
          completedOn: result[i].doc.completedOn,
          comment: result[i].doc.comment,
          versionReference: result[i].doc.versionReference,
          id: result[i].id,
        }
      }
      this.dataset = arr;
    })
  }

  assignStatus(data: any) {
    console.log(data)
    if (data === "in progress") {
      status = "40"
    }
    else if (data === "new") {
      status = "10"
    }
    else if (data === "closed") {
      status = "100"
    }
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












