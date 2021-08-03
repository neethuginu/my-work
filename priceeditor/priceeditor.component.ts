// <!--
// * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
// -->
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularGridInstance, Column, Editors, formatNumber, GridOption } from 'angular-slickgrid';
import { SessionStore } from '../../../services/session.store';
import { SlickService } from '../slick.service';
import moment from "moment";
// import { RestApiService } from '../../../services/rest-api.service';

declare const Slick: any;

@Component({
  selector: 'app-priceeditor',
  templateUrl: './priceeditor.component.html',
  styleUrls: ['./priceeditor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PriceeditorComponent implements OnInit {
  today = moment().format(" MMMM DD YYYY");

  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  gridOptions!: GridOption;
  dataset: any[] = [];
  frozenColumnCount = 2;
  frozenRowCount = 3;
  isFrozenBottom = false;
  gridObj: any;
  slickEventHandler: any;

  // edit
  isAutoEdit = true;
  alertWarning: any;
  id: any;
  updatedObject: any;
  object:any;
  newObj: any;
  data: any = {};
  discount: any;
 priceHistory: any[] = [];


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
        id: 'pid', name: 'Product Id', field: 'pid',
        minWidth: 100, width: 120,
        cannotTriggerInsert: true,
        resizable: false,
        unselectable: true,
        // onCellClick: (e: Event, args: OnEventArgs) => {
        //   console.log(args, e);
        // }
      },
      {
        id: 'productName', name: 'Product Name', field: 'productName',
        minWidth: 80, width: 80,
        filterable: true,
        sortable: true,
      },
      {
        id: 'price', name: 'Price', field: 'price',
        resizable: false,
        minWidth: 100, width: 80,
        filterable: true,
        sortable: true,
      },
      {
        id: 'discount', name: 'Discount', field: 'discount',
        resizable: false,
        minWidth: 100, width: 80,
        filterable: true,
        sortable: true,
      },
      {
        id: 'discounttype', name: 'Discount Type', field: 'discounttype',
        resizable: false,
        minWidth: 100, width: 100,
        filterable: true,
        sortable: true,
      },
      {
        id: 'newPrice', name: 'New Price', field: 'newPrice',
        resizable: false,
        minWidth: 100, width: 80,
        filterable: true,
        sortable: true,
        editor: {
          model: Editors.text,
          required: true,
        },
      },
      //   {
      //     id: 'newdiscounttype', name: 'New Dsicount Type', field: 'newdiscounttype', width: 100, minWidth: 120, maxWidth: 150,
      //     excludeFromExport: true,
      //     formatter: () => ` <div class="col-md-12">
      //     <select name="my-select"  (change)="selectChange($event)" >
      //     <option value="">select</option>
      //         <option value="percentage" >Percentage</option>
      //         <option value="amount"> Amount </option>
      //     </select>
      // </div>`,    
      //   },
      //   {
      //     id: 'value', name: 'Value', field: 'value',
      //     resizable: false,
      //     minWidth: 100, width: 80,
      //     filterable: true,
      //     sortable: true,
      //     editor: {
      //       model: Editors.text,
      //       required: true,
      //     },
      //   },
      {
        id: 'newdiscount', name: 'Discount ', field: 'newdiscount',
        resizable: false,
        minWidth: 100, width: 80,
        filterable: true,
        sortable: true,
        editor: {
          model: Editors.text,
          required: true,
        },
      },
      {
        id: 'discountedprice', name: 'Discounted Price ', field: 'discountedprice',
        resizable: false,
        minWidth: 100, width: 80,
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
    this.dataService.getData().subscribe((res: any) => {
      debugger;
      // this.object=res;
      const arr: any[] = [];
      for (let i = 0; i < res.length; i++) {
        arr[i] = {
          productName: res[i].doc.productName,
          price: res[i].doc.price,
          pid: res[i].doc.pid,
          discount: res[i].doc.discount,
          discounttype: res[i].doc.discounts,
          id: res[i].id,
        }
      }
      console.log(arr)
      this.dataset = arr;
    })
  }

 

  onSubmit() {
    this.updatedObject.price = this.data.newPrice;
    this.updatedObject.discount = this.data.newPrice - this.data.newdiscount;
    delete this.updatedObject.newPrice;
    delete this.updatedObject.pid;
    delete this.updatedObject.productName;
    delete this.updatedObject.discounttype;
    delete this.updatedObject.id;
    delete this.updatedObject.newdiscount;

    this.dataService.update(this.id, this.updatedObject).subscribe(() => {
    }) 
  }
 

  onActiveCellChanged(event: any, args: any) {
    console.log(event)
    console.log(args.items)
  }

  onCellChanged(e: Event, args: any) {
    console.log(e,args);
    this.data=args.item;
    console.log(this.data);
    this.updatedObject=args.item;

    // console.log(this.updatedObject)
    this.id = this.data.id;
    const obj: any = {
      previousPrice: this.updatedObject.price,
      modifyDate: this.today,
      loginUser: SessionStore.getUserProfile().profile,
    }
   this.priceHistory.push(obj);
    // this.updatedObject.discounts=Amount;
    // this.updatedObject.priceHistory= this.priceHistory,
    console.log(this.id)
    console.log(this.updatedObject)   

  }

  onCellClicked(e: Event, args: any) {
    const metadata = this.angularGrid.gridService.getColumnFromEventArguments(args);
    console.log(metadata);
    console.log(e);
  }

  /** change dynamically, through slickgrid "setOptions()" the number of pinned columns */
  changeFrozenColumnCount() {
    if (this.gridObj && this.gridObj.setOptions) {
      this.gridObj.setOptions({
        frozenColumn: this.frozenColumnCount
      });
    }
  }
  /** change dynamically, through slickgrid "setOptions()" the number of pinned rows */
  changeFrozenRowCount() {
    if (this.gridObj && this.gridObj.setOptions) {
      this.gridObj.setOptions({
        frozenRow: this.frozenRowCount
      });
    }
  }

  costDurationFormatter(_row: number, _cell: number, _value: any, _columnDef: Column, dataContext: any) {
    const costText = this.isNullUndefinedOrEmpty(dataContext.cost) ? 'n/a' : formatNumber(dataContext.cost, 0, 2, false, '$', '', '.', ',');
    let durationText = 'n/a';
    if (!this.isNullUndefinedOrEmpty(dataContext.duration) && dataContext.duration >= 0) {
      durationText = `${dataContext.duration} ${dataContext.duration > 1 ? 'days' : 'day'}`;
    }
    return `<b>${costText}</b> | ${durationText}`;
  }

  isNullUndefinedOrEmpty(data: any) {
    return (data === '' || data === null || data === undefined);
  }

  onValidationError(_e: Event, args: any) {
    alert(args.validationResults.msg);
  }
}











