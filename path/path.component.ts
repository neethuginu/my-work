// <!--
// * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
// -->
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularGridInstance, Column, Formatters, GridOption } from 'angular-slickgrid';
import { PathService } from '../path.service';
import * as uuid from "uuid";

declare const Slick: any;
@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PathComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  gridOptions!: GridOption;
  dataset: any[] = [];
  gridObj: any;
  slickEventHandler: any;
  updatedObject: any;
  roleGroupData: any[] = [];
  application: any[] = []

  // edit
  isAutoEdit = true;
  alertWarning: any;
  id: any;

  role_pid: string = "INEVITO-SHIPACO-DIAMOND-PRODUCT-ROLE-MASTER";
  role_id: string = "633ca1268d6501b94831c7e3369a461b";

  app_pid: string = "INEVITO-SHIPACO-DIAMOND-RELEASE-URL-MASTER";
  app_id: string = "8b61079750c937b7638309e4130008ef";

  constructor(
    private dataService: PathService,
    private formBuilder: FormBuilder,

  ) {
    this.slickEventHandler = new Slick.EventHandler();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      application: ["", Validators.required],
      availableAppPath: ["", Validators.required],
      permissionAcls: ["", Validators.required],
      pathAcls: ["", Validators.required],
    });
    this.prepareDataGrid();
    this.getData();
    this.getRole();
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
        id: 'application', name: 'Application', field: 'application',
        minWidth: 200, width: 200,
        cannotTriggerInsert: true,
        filterable: true,
        resizable: false,
        unselectable: true,
        // filter: {
        // model: Filters.application, // create a new instance to make each Filter independent from each other
        // collection: this.application,
        // params: {
        //   component: FilterNgSelectComponent,
        // }
      },
      {
        id: 'availableAppPath', name: 'Available Application Path', field: 'availableAppPath',
        minWidth: 200, width: 200,
        filterable: true,
        sortable: true,
        formatter: Formatters.dateTimeShortEuro
      },
      {
        id: 'permissionAcls', name: 'Permission Acls', field: 'permissionAcls',
        resizable: false,
        minWidth: 200, width: 200,
        filterable: true,
        sortable: true,
      },
      {
        id: 'pathAcls', name: 'Path Acls', field: 'pathAcls',
        resizable: false,
        minWidth: 200, width: 200,
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
      enableFiltering: true,
      autoEdit: true,
      asyncEditorLoading: true,
      enableColumnReorder: false,
      gridMenu: { hideClearFrozenColumnsCommand: false },
      headerMenu: { hideFreezeColumnsCommand: false }
    };
  }

  getData() {
    this.dataService.getAllData().subscribe((res: any) => {
      this.dataset = res;
      console.log(this.dataset)
    })
  }

  getRole() {
    this.dataService
      .getRole(this.role_id, this.role_pid)
      .subscribe((resp: any) => {
        if (resp) {
          this.roleGroupData = resp.masterMenu;
        }
      });
    this.dataService
      .getRole(this.app_id, this.app_pid,)
      .subscribe((resp: any) => {
        console.log(resp)
        if (resp) {
          this.application = resp.masterMenu;
        }
        console.log(this.application)
      });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(){
    console.log(this.dataset)
     this.updatedObject = this.dataset;
    // this.dataService.create(this.updatedObject).subscribe((res) => {
    //   if(res) {
    //      this.getData();
    //   }     
    // })
  }
  onSave(data: any) {
    console.log(data)
    data.id = uuid.v4();
    this.dataset.push(data)
    console.log(this.dataset)

 
  }


  onActiveCellChanged(event: any, args: any) {
    console.log(event)
    console.log(args)
  }

  onCellChanged(e: Event, args: any) {
    console.log(e, args.items);
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
